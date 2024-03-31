A rewritten version of pakku.js

New Features:

- Better customization user scripts

Improvements:

- Read blacklist from localStorage bpx_player_profile.blockList
- Parallelization with Web Worker
- Removed background page (reduces ~40MB RAM usage)
- Removed telemetry

Code quality improvements:

- Adopt Manifest V3
- Adopt TypeScript
- Adopt modern JS features (e.g., ES modules, async functions, for-of loop...)

Breaking changes:

- Removed BLACKLIST config (will read player blacklist)
- Removed HIDE_THRESHOLD config (use userscripts to achieve that)
- Removed CLOUD_SYNC config (now depend on browser settings)

Work in progress.