# Project Phoenix Command Center v1.0

Productieklare, contentgestuurde eerste versie van het centrale onderzoeksplatform voor Project Phoenix.

## Belangrijkste functies
- Responsive desktop- en mobiele interface
- Dark/light mode
- Engine Registry met status, voortgang en confidence
- Detailpanelen met confirmed facts, hypotheses, tests en vervolgstappen
- Evidence/traceability-matrix
- Documentatiebibliotheek
- Projecttijdlijn en updatefeed
- Lokale beheerpagina
- JSON-import en -export voor PPCC Update Packs
- Automatische deployment via GitHub Actions en GitHub Pages

## Lokale start
```bash
npm ci
npm run dev
```

## Productiebuild
```bash
npm ci
npm run build
```

De productieversie verschijnt in `dist/`.

## GitHub Pages
1. Upload de inhoud van deze map naar de root van de repository.
2. Ga naar **Settings → Pages**.
3. Kies bij Source: **GitHub Actions**.
4. Push naar de branch `main`.
5. De workflow `.github/workflows/deploy.yml` bouwt en publiceert de website automatisch.

## Updates toevoegen
De applicatie leest alle projectgegevens uit:

`public/content/project.json`

Via **Beheer** kun je lokaal een update toevoegen en vervolgens een nieuw JSON-bestand exporteren. Vervang daarna in GitHub alleen `public/content/project.json`. De site wordt automatisch opnieuw gepubliceerd.

## Geteste omgeving
- Node.js 20
- npm ci
- TypeScript build
- Vite production build
