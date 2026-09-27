# ROOM01 WebGL integration

PLAY: games/room01/play/ (relative to the site root).
Source: C:/Users/hyoichi/UnityProjects/ROOM01/Builds/WebGL/ROOM01_Release

The original build uses Brotli without a JavaScript decompression fallback.
For GitHub Pages, only the site copy was decompressed byte-for-byte:
- Build/ROOM01_Release.data.br -> .data
- Build/ROOM01_Release.framework.js.br -> .js
- Build/ROOM01_Release.wasm.br -> .wasm
The three URLs in play/index.html were changed accordingly. The loader,
TemplateData and game payload were otherwise retained. No Unity rebuild.
Do not replace these files with .br files without appropriate HTTP headers.
BuildVerification.txt is a build report, not a runtime dependency, and was not copied.

Local test: serve the site root with a regular HTTP server (not file://).
No special Content-Encoding header is required. Serve .wasm as application/wasm.
The existing GitHub Pages branch/folder selection was not changed or verified
through authenticated repository settings; keep the currently published source.
No deployment was performed.