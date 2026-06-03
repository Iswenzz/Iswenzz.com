# AION

![](https://i.imgur.com/vZItSj9.jpeg)

A client modification for the AION Project powered by [IzEngine](https://github.com/Iswenzz/IzEngine). Built to go beyond the limitations of the original client. 
It reworks the engine layer, fixing long-standing bugs, modernizing performance.

## Engine

- Fixed the 64-bit client.
- Reworked camera behavior to fix broken movements and jitter.
- Corrected 2D texture positioning.
- Removed the IP lock, so the client connects wherever the project points.
- DXVK integrated, translating Direct3D to Vulkan for smoother frame pacing and fewer stalls.
- Graphics pipeline hooked for custom rendering, huds, and effects.

## Game

- In-game browser hooked so video can play anywhere in game.
- Bink API hooked to play local video files.
- Stripped out unused data tables, cutting load time.
- Developer console and engine cvars unlocked.
- Camera hooking exposed for programmatic control.
- Reworked in-game menus.
- Reaches the AION-Project website from inside the client.

## Building

_Pre-Requisites:_

1. [Visual Studio](https://visualstudio.microsoft.com/)
2. [CMake](https://cmake.org/) and [vcpkg](https://vcpkg.io/en/).

_Build Command:_

    ./build.bat

### [Download](https://github.com/Iswenzz/AION/releases)

## Contributors

***Note:*** If you would like to contribute to this repository, feel free to send a pull request, and I will review your code.
Also feel free to post about any problems that may arise in the issues section of the repository.
