# PPCC Foundation v1

Dit is de minimale, stabiele foundation voor het Project Phoenix Command Center.

## Waarom zonder npm?
De eerste stap is uitsluitend bewijzen dat GitHub Pages en GitHub Actions betrouwbaar functioneren. Daarom gebruikt deze foundation:

- HTML
- CSS
- JavaScript
- nul externe dependencies
- geen compile- of buildstap

Na een succesvolle live deployment bouwen we de applicatie stapsgewijs verder uit.

## Installeren in je lokale GitHub Desktop-repository
1. Maak de lokale repositorymap leeg, maar verwijder de verborgen `.git`-map niet.
2. Kopieer alle inhoud van deze foundation naar die map.
3. Controleer dat `.github/workflows/deploy.yml` is meegekopieerd.
4. Commit in GitHub Desktop.
5. Push naar `main`.
6. Controleer de workflow onder Actions.
