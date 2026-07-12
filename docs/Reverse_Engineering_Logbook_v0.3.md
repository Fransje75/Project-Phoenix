# Project Phoenix — Reverse Engineering Logbook v0.3

## Doel
UEFA Manager 2000 systematisch reconstrueren voor een functioneel 1-op-1 webspel, vóór enige remastering.

## Bronnen
- Originele game en screenshots
- Originele handleiding
- Installatie- en Data-map
- Savegames
- UEFA Editor onder Windows 98
- UEFA2000b.exe
- Ghidra, x32dbg en API Monitor

## Testcatalogus
| Test | Wijziging | Status |
|---|---|---|
| Baseline | Eerste mogelijke save op Football Today | Voltooid |
| Day 1 | Enkele ingame dagen vooruit | Voltooid |
| Training 1 | Balanced → Offensive | Voltooid |
| Training 2 | Offensive → Defensive | Voltooid |
| TM-01 | Twee basisspelers omgewisseld | Voltooid |
| TM-02 | Positie gewijzigd | Voltooid |
| TM-03 | Formatie gewijzigd | Voltooid |
| TM-04 | Captain gewijzigd | Voltooid |
| TM-05 | Penaltynemer gewijzigd | Voltooid |
| TM-06 | Vrije trapnemer gewijzigd | Voltooid |
| TM-07 | Cornernemer(s) gewijzigd | Voltooid |
| PS-01 | Contractvoorstel openstaand | Voltooid |
| PS-02 | Reactie op contractvoorstel | Voltooid |
| TR-01 | Transferbod openstaand | Voltooid |
| TR-02 | Reactie op transferbod | Voltooid |
| ME-01 | Eerste wedstrijd gespeeld | Voltooid |

## Belangrijkste bevestigde bevindingen
- Savegames bestaan uit meerdere bestanden die verschillende delen van de wereldstatus bewaren.
- `.sav` en `.bin` reageren op manager-, team- en tactiekwijzigingen.
- `.mhs` groeit sterk na wedstrijden.
- `.chs` groeit bij club- en transfergebeurtenissen.
- De wedstrijdsimulatie is niet deterministisch.
- Fitness, morale en aggression worden tijdens wedstrijden dynamisch weergegeven.
- Hidden attributes zijn een officiële kernmechaniek.
- Veel hidden attributes worden bij een nieuw spel willekeurig ingesteld.

## Open onderzoek
- Exacte binaire recordstructuren
- Checksums/compressie
- Player-records en dynamische rating
- Ontwikkelingsformules
- Match-eventgenerator
- Transfer- en financiële AI
- Competition/seizoensovergang
