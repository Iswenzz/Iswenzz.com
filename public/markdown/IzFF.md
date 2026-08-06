# IzFF

IzFF is a cross-platform game asset processing tool built to parse game formats
and rebuild whole levels as a plain, engine-agnostic scene. Nothing about the
original engine survives the import: a Quake BSP, a Call of Duty fastfile and a
CryEngine level all land in the same `IzFF::Scene` struct, with geometry in one
coordinate system, textures decoded to DDS, and materials, lights, entities and
brushes carried across as data rather than engine state.

That scene is the whole point of the project. Once a level is in it, the level
is no longer tied to the game it came from: it can be written back out as an
`.iz` file, converted to FBX, rebuilt as a Call of Duty 4 map that actually
compiles, imported into Unreal Engine, or streamed to a browser viewer over
HTTP. Adding a game means writing one importer; every output it gains for free.

```
game archives ──▶ importer ──▶ IzFF::Scene ──▶ .iz / FBX / CoD4 map source
   .pak .pk3        per game     (generic)      UE plugin / Web viewer
   .iwd .vpk .ff
```

## Supported games

Each importer mounts the game's archives into a virtual filesystem, then builds
a scene from its world file. Textures are decoded from whatever the game ships
and normalized to DDS.

| Game                             | Engine    | Archives      | World format                | Textures                |
| -------------------------------- | --------- | ------------- | --------------------------- | ----------------------- |
| Quake                            | id Tech 2 | `.pak`        | BSP 29 / 30                 | palettized miptex       |
| Quake II                         | id Tech 2 | `.pak`        | IBSP 38                     | `.wal` + `.pcx` palette |
| Quake III Arena                  | id Tech 3 | `.pk3`        | IBSP 46 / 47                | `.tga`, `.jpg`          |
| Call of Duty                     | id Tech 3 | `.pk3`        | IBSP 59                     | `.tga`, `.jpg`          |
| Call of Duty 2                   | IW 2.0    | `.iwd`        | D3DBSP 4                    | `.iwi`                  |
| Call of Duty 4                   | IW 3.0    | `.iwd`, `.ff` | fastfile zone               | `.iwi`                  |
| Counter-Strike: Source           | Source    | `.vpk`        | VBSP 19–21                  | `.vmt` / `.vtf`         |
| Counter-Strike: Global Offensive | Source    | `.vpk`        | VBSP 19–21                  | `.vmt` / `.vtf`         |
| Portal                           | Source    | `.vpk`        | VBSP 19–21                  | `.vmt` / `.vtf`         |
| Portal 2                         | Source    | `.vpk`        | VBSP 19–21                  | `.vmt` / `.vtf`         |
| AION                             | CryEngine | `.pak`        | `leveldata`, `.cgf`, `.h32` | `.dds`                  |

## Output formats

The converter turns a built scene into any combination of these; pass `-f` once
per format.

| Format         | Flag      | Output                                                                                                                                  |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| IzFF scene     | `-f iz`   | `.iz` — the scene serialized as MessagePack, zstd compressed. The format the plugins read.                                              |
| FBX            | `-f fbx`  | Binary FBX 7.4 — geometry, materials and transforms, for any DCC tool.                                                                  |
| Call of Duty 4 | `-f cod4` | A complete, compilable map source tree — `iwmap 4` map, GDT, `xmodel_export` models, images, zone CSVs, GSC scripts and a build `.bat`. |

## Plugins

| Plugin                                 | Host                              | Reads           | What it does                                                                                                                                                                                                                                                                                     |
| -------------------------------------- | --------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [IzFF Scene Importer](plugins/UE/IzFF) | Unreal Engine 5.8 (editor module) | `.iz`           | Imports a scene as static meshes, materials, textures, terrain with a splat material, and a populated level — instances, lights, sky cube, water volume, brush collision, effects and entity actors. Bundles its own MessagePack, zstd and DDS readers, so it has no dependency on the C++ core. |
| [Web viewer](plugins/Web)              | Next.js / React Three Fiber       | `.iz` over HTTP | A three.js renderer for scenes served by the Web tool. Instanced meshes, a terrain splat shader, BVH-accelerated raycasting, a worker that decodes scenes off the main thread, and a Dexie/IndexedDB cache so a map is only downloaded once.                                                     |

## The IzFF scene

Everything an importer produces and every exporter consumes is
[`IzFF::Scene`](src/Core/Scene.hpp). It is plain data — no pointers, no engine
handles — and every type in it is serializable in one pass. A scene holds:

- **Models** — meshes with materials, node hierarchy, bind transforms, bounds
  and animation tracks; the `World` flag marks level geometry over props.
- **Meshes** — vertex/index buffers, plus grids marking a run of indices as a
  `Width × Height` patch so terrain and curves stay surfaces, not loose triangles.
- **Vertices** — position, normal, UV and vertex colour.
- **Instances** — model placements: transform, material override, visibility,
  and the source entity's key/values verbatim.
- **Terrain** — row-major height grid with spacing, hole mask, and up to four
  blended layers per vertex, each naming a material and its tiling.
- **Brushes** — convex volumes as bounding planes, per-side materials, content
  flags and owning entity.
- **Entities** — classname and key/values: spawns, triggers, script structs, targets.
- **Lights** — position, colour, intensity, range, direction and cone angles.
- **Effects** — looping, one-shot and sound emitters, with asset, placement and interval.
- **Textures** — name, source path and decoded DDS bytes, so a scene renders
  without the original game.
- **Materials** — diffuse, normal, specular and second diffuse, opacity, alpha
  test, sort order, sampler flags, UV scroll, and flags for two-sided, additive,
  blend, decal, water and the rest.
- **Animations** — named clips of position/rotation/scale channels keyed per node.
- **Environment** — sun, ambient, fog, view distance, colour grading, time of
  day, water level and colour, default spawn.
- **Sky** — procedural horizon/zenith colours or a six-face cubemap, with
  rotation, tint and intensity.
- **Bounds** — the scene AABB, and per-model AABBs.

Anything a game stores that has no generic home is preserved in the `Extra`
byte blob present on most types, so an importer can pass engine-specific data
through to an exporter that knows how to read it without widening the format
for everyone else.

## Tools

| Tool        | What it is                                                                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Converter` | CLI. Builds a scene from a game map and writes it out in one or more formats.                                                                                            |
| `Engine`    | Windows GUI viewer. Builds a scene and renders it directly, for checking an importer's output.                                                                           |
| `Web`       | HTTP server on `localhost:9000`. Serves scenes as zstd-compressed MessagePack with an on-disk cache, plus endpoints to browse and search the mounted virtual filesystem. |

Convert a map:

```bash
Converter CoD2 mp_carentan -d "C:/Games/Call of Duty 2" -n mp_cod2_carentan -f iz -f fbx
```

Rebuild an AION level as a Call of Duty 4 map:

```bash
Converter AION housing_idlf_personal -d "C:/Games/AION Project" -n mp_aion_oriel_studio -f cod4
```

Serve scenes to the web viewer:

```bash
Web AION -d "C:/Games/AION Project"
```

The Web tool exposes `/scene/map?id=`, `/scene/model?path=`, `/files`,
`/file?path=` and `/search?q=`.

## Building

_Pre-Requisites:_

1. [Visual Studio](https://visualstudio.microsoft.com/)
2. [CMake](https://cmake.org/) and [vcpkg](https://vcpkg.io/en/).

_Build Command:_

    mkdir build && cd build
    cmake .. --preset windows
    cmake --build .

A `linux` preset is available as well.

### [Download](https://github.com/Iswenzz/IzFF/releases)

## Contributors

**_Note:_** If you would like to contribute to this repository, feel free to send a pull request, and I will review your code.
Also feel free to post about any problems that may arise in the issues section of the repository.
