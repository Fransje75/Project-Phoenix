# Project Phoenix Command Center v1.5

## Nieuwe functionaliteit
- Research Center
- Volledig dossier per test
- Procedure, resultaat, conclusie en open vragen
- Evidence chain per test
- Koppeling naar gerelateerde engines
- Bestanden- en screenshotregistratie
- Research Matrix per engine
- Zoek- en statusfilters
- Modulaire Data Architecture 2.0

## Nieuwe data-opbouw
```text
data/
  manifest.json
  engines/
    index.json
    player.json
    match.json
    ...
  tests/
    index.json
    TM-01.json
    TR-01.json
    ...
  knowledge/
    graph.json
  timeline/
    updates.json
  documents/
    index.json
```

## Installeren
1. Pak de ZIP uit.
2. Vervang via GitHub Desktop de huidige PPCC-bestanden.
3. Laat de verborgen `.git`-map staan.
4. Commit: `Add PPCC v1.5 Research Center`
5. Push origin.
6. Controleer Actions en de live site.

Geen npm, dependencies of buildstap nodig.
