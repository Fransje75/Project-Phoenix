# Project Phoenix Command Center v0.1

Eerste React + TypeScript + Tailwind-versie van het centrale Project Phoenix-onderzoeksplatform.

## Functies in v0.1
- Responsive desktop- en mobiele navigatie
- Donkere en lichte weergave
- Engine Registry met voortgang, status en confidence
- Detailpanelen met confirmed facts, hypotheses, tests en vervolgstappen
- Lokale aanpassing van voortgang via browseropslag
- Documentatiebibliotheek met downloads
- Evidence/traceability-overzicht
- Projecttijdlijn
- GitHub Pages-geschikte Vite-configuratie

## Lokaal starten
```bash
npm install
npm run dev
```

## Productiebuild
```bash
npm run build
```

De bestanden verschijnen daarna in `dist/`.

## GitHub Pages
1. Upload deze projectmap naar je GitHub-repository.
2. Voer lokaal `npm install` en `npm run build` uit.
3. Publiceer `dist/` of gebruik `npm run deploy`.
4. Voor automatische deployment kan later een GitHub Actions-workflow worden toegevoegd.

## Volgende geplande modules
- Browsergebaseerde Markdown-reader
- Universele zoekfunctie door alle documentatie
- Research Wiki
- Savegame Explorer
- Interactieve Knowledge Graph
- Screenshot Gallery
- Executable Explorer
- GitHub-integratie en automatische updates
