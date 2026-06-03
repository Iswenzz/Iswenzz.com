# AION Project

![AION](https://i.imgur.com/fJ98rh9.png)

AION Project is a private server built on a fork of [Beyond Aion](https://github.com/beyond-aion/aion-server). Every piece of game data has been redone from the ground up, re-parsed, reworked, and modded to fit the experience I wanted. The goal was simple to state and enormous to actually do: bring back **everything**. Every version's content, up through 5.6, with nothing deleted and nothing nerfed.

The difficulty sits close to AION 1.0, the version where the game asked something of you and rewarded you for rising to it. There are no hand-outs here, no quietly inflated XP, no softened damage or padded health pools to make encounters forgiving. The numbers are tuned to the original challenge.

Most dungeons were recreated from scratch. I wanted the strategies, the pacing, and the rewards players actually remember from the live game. Where a fight genuinely benefited from it, I went further and introduced new strategies of my own, but only where I felt it earned its place.

You can lock your character's level at any point you choose. If you want to sit in a specific PvE / PvP bracket to run particular content without pushing your main past it, you can, without sacrificing your progression. It's a small piece of flexibility that opens up how people can actually play together.

You can switch between UI layouts pulled from different eras of the game. Whether you're attached to the classic interface or a later revision, the client bends to your taste rather than the other way around.

## The client

A huge part of this project lives below the server, in the client itself. I took the original client files and completely depacked, decrypted, and restructured them into a clean architecture, and on top of that, merged the files from every versions into a single coherent set. That includes every language pack I could track down: English, English (North America), French, German, Spanish, Polish, Turkish, Russian, Japanese, Chinese, and Korean.

The custom client binary, the **[AION](https://github.com/Iswenzz/AION)** repository, is where the engine work happens. It patches bugs that lived in the engine for years, fixing 2D texture positioning, correcting camera behavior, stripping out unnecessary data tables, and getting the 64-bit client working properly. It adds DXVK for a real performance boost, hooks the graphics pipeline, and hooks the in-game browser so videos can play inside the client, including local video files through a hooked Bink API. It unlocks the console and cvars, exposes camera hooking, removes the IP lock, and reworks the in-game menus. It's the layer that makes everything else feel modern without feeling like a different game.

## The wider ecosystem

**[AION-Project.eu](https://github.com/Iswenzz/AION-Project.eu)** is the official website for the server including a game database, items, NPCs, quests, and more, alongside player information and game information. And because of IzFF, it has an engine page letting you explore the game's models and maps without launching the client. The site is also reachable from within the game itself.

**[AION-Launcher](https://github.com/Iswenzz/AION-Launcher)** is the front door. It downloads the game, verifies integrity, keeps everything updated, and starts the client with the language you want, and it goes granular: you can set the language independently for text, for voices, and for cutscenes. It also lets you choose your UI theme, whether that's the original *Tower of Eternity* look, the *Ascension* skin, or the *Echoes of Eternity* skin.

**[AION-Encdec](https://github.com/Iswenzz/AION-Encdec)** is the tooling that makes the client work possible at all, depacking, decrypting, and repacking the game's archives and files.

**[IzFF](https://github.com/Iswenzz/IzFF)** handles the reverse-engineering of the game's CGF and LST files, turning them into `.iz` files that can be saved or served. This is the bridge between the raw game assets and the website engine.

## Why

I played for more than a decade. It was, and still is, my favorite game, I ranked among the top PvE players as a sorcerer on the European Urtem server. This project is my answer to what happened to that game. Over the years, the original publisher slowly took it apart, nerfing what made it hard, deleting content that made it rich, and piling on unfair and pay-to-win features that had nothing to do with the game.

AION Project is my attempt to put it back together the way it should have been. Not a snapshot of one patch, not a watered-down "classic" edition, but the full game, restored and rebuilt to my own vision of it.

This took years to build, in whatever spare time I had. I did it because AION matters to me more than any other game. Every part of this project, from the reverse-engineering of the engine, the re-parsed data to the dungeon redesigns, comes from the same place: a refusal to let a great game be remembered only as the worse thing it was turned into.

If any of that resonates with you, you already understand why this exists.

## Contributing

Contributions are genuinely welcome. Open a pull request and I'll review it. If you run into problems, report them in the repository's Issues section, bug reports are just as valuable as code.

## Acknowledgments

[**Aion-Emu**](https://web.archive.org/web/20100128222712/http://aion-emu.com/), the first AION server development project, and the foundation that every major emulator since has been built on.

[**Beyond Aion**](https://github.com/beyond-aion/aion-server), a reworked and optimized emulator based on Aion-Lightning, focused on faithfully recreating the game while fixing critical issues and adding thoughtful improvements.
