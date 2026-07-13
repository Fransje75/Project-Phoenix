# Project Phoenix — Reverse Engineering Logbook v0.3

## Doel
UEFA Manager 2000 systematisch reconstrueren voor een functioneel 1-op-1 webspel, vóór enige remastering.

## Testcatalogus
- Baseline: eerste mogelijke save op Football Today
- Training: Balanced → Offensive → Defensive
- TM-01 t/m TM-07: selectie, positie, formatie en spelhervattingen
- PS-01/02: contractvoorstel en reactie
- TR-01/02: transferbod en reactie
- ME-01: eerste wedstrijd en live statistieken

## Belangrijkste bevindingen
- Savegames bestaan uit meerdere gespecialiseerde bestanden.
- De wedstrijdsimulatie is niet deterministisch.
- Fitness, morale en aggression zijn dynamisch tijdens wedstrijden.
- Hidden attributes zijn een officiële kernmechaniek.
