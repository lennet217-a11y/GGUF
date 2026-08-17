# GGUF Lab

Electron desktop app for inspecting GGUF files and comparing conservative model memory requirements with the host system.

## Run

```bash
npm install
npm start
```

## Windows build

```bash
npm install
npm run dist
```

The NSIS installer is generated in `dist/`.

## Current MVP

- GGUF header validation
- file size, version, tensor count and metadata count
- CPU, cores and RAM detection
- conservative RAM-fit estimate

A future benchmark runner can integrate llama.cpp for real tokens/sec, CPU/GPU, VRAM and context testing.
