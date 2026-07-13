window.PPCC_DATA = {
  "version": "1.6",
  "updated": "13 juli 2026 — v1.6",
  "overall": 67,
  "confidence": 74,
  "sprint": "Sprint 1 — Reverse Engineering",
  "engines": [
    {
      "id": "manual",
      "name": "Handleidinganalyse",
      "group": "Bronnen",
      "progress": 100,
      "confidence": 100,
      "status": "complete",
      "summary": "De volledige handleiding is behandeld en verwerkt in de documentatiesuite.",
      "facts": [
        "Alle inhoudelijke pagina’s behandeld",
        "Terminologie en ontwerpfilosofie vastgelegd",
        "Koppelingen naar FSD, ES, DMS en DDL"
      ],
      "hypotheses": [],
      "next": "Gebruik als primaire functionele referentie.",
      "tests": [
        "HM-001 t/m HM-088"
      ],
      "dependencies": [],
      "sources": [
        "Originele handleiding",
        "Pagina-voor-pagina analyse"
      ],
      "timeline": [
        {
          "date": "2026-07-12",
          "title": "Handleiding afgerond",
          "summary": "Alle inhoudelijke pagina’s zijn behandeld en gekoppeld aan de documentatiesuite."
        }
      ],
      "documents": [
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md",
        "Domain_Model_Specification_v0.4.md"
      ],
      "notes": [
        "Primaire bron voor ontwerpintentie en officiële terminologie."
      ]
    },
    {
      "id": "savegame",
      "name": "Savegame Engine",
      "group": "Reverse Engineering",
      "progress": 70,
      "confidence": 72,
      "status": "active",
      "summary": "De modulaire save-opbouw is onderzocht met gecontroleerde savegame-reeksen.",
      "facts": [
        ".sav en .bin reageren op team- en tactiekwijzigingen",
        ".mhs groeit sterk na wedstrijden",
        ".chs groeit bij club- en transfergebeurtenissen"
      ],
      "hypotheses": [
        ".phs bevat vaste spelerrecords",
        ".dhs bevat divisie- of competitiehistorie"
      ],
      "next": "Binaire offsets, recordstructuren en eventuele checksums bepalen.",
      "tests": [
        "Baseline",
        "TM-01 t/m TM-07",
        "TR-01/02",
        "ME-01"
      ],
      "dependencies": [
        "player",
        "training",
        "tactics",
        "match",
        "transfer",
        "competition"
      ],
      "sources": [
        "Baseline saves",
        "Differential save tests",
        "Bestandsgroottes",
        "Binaire vergelijkingen"
      ],
      "timeline": [
        {
          "date": "2026-07-06",
          "title": "Baseline vastgesteld",
          "summary": "Eerste mogelijke save op Football Today vastgelegd."
        },
        {
          "date": "2026-07-07",
          "title": "Modulaire save-opbouw bevestigd",
          "summary": "Verschillende acties wijzigen verschillende savebestanden."
        },
        {
          "date": "2026-07-11",
          "title": "Match history-groei gezien",
          "summary": ".mhs groeit sterk na een officiële wedstrijd."
        }
      ],
      "documents": [
        "Reverse_Engineering_Logbook_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Volgende grote stap: records en offsets vastleggen in een formele structuur."
      ]
    },
    {
      "id": "player",
      "name": "Player Engine",
      "group": "Engines",
      "progress": 62,
      "confidence": 68,
      "status": "active",
      "summary": "Zichtbare vaardigheden, hidden attributes, potential en dynamische wedstrijdwaarden zijn geïdentificeerd.",
      "facts": [
        "Acht zichtbare trainbare skills",
        "Hidden attributes bestaan en worden deels gerandomiseerd",
        "Fitness en morale veranderen tijdens wedstrijden"
      ],
      "hypotheses": [
        "Dynamische overall rating",
        "Leeftijd × potential × training bepaalt ontwikkeling"
      ],
      "next": "Player-recordstructuur en ontwikkelingsformule technisch bewijzen.",
      "tests": [
        "PS-01/02",
        "ME-01",
        "Editoronderzoek"
      ],
      "dependencies": [
        "training",
        "tactics",
        "match",
        "transfer",
        "staff"
      ],
      "sources": [
        "Handleiding",
        "Editor",
        "Wedstrijdscreenshots",
        "Savegame tests"
      ],
      "timeline": [
        {
          "date": "2026-07-10",
          "title": "Hidden attributes bevestigd",
          "summary": "De handleiding beschrijft verborgen persoonlijke eigenschappen."
        },
        {
          "date": "2026-07-11",
          "title": "Dynamische waarden gezien",
          "summary": "Fitness en morale veranderen tijdens de wedstrijd."
        }
      ],
      "documents": [
        "Engine_Specification_v0.4.md",
        "Domain_Model_Specification_v0.4.md",
        "Knowledge_Graph_v0.4.md"
      ],
      "notes": [
        "Dynamic rating en development curve hebben hoge onderzoeksprioriteit."
      ]
    },
    {
      "id": "training",
      "name": "Training Engine",
      "group": "Engines",
      "progress": 90,
      "confidence": 92,
      "status": "complete",
      "summary": "Teamtraining, presets, Custom-schema’s, trainingskamp en individuele training zijn functioneel beschreven.",
      "facts": [
        "Balanced/Defensive/Offensive/Week Off",
        "Custom na handmatige wijziging",
        "Delegate hangt af van Head Trainer rating"
      ],
      "hypotheses": [
        "Exacte effectgroottes per trainingsactiviteit"
      ],
      "next": "Ontwikkelings- en vermoeidheidsformules reverse engineeren.",
      "tests": [
        "Balanced → Offensive",
        "Offensive → Defensive"
      ],
      "dependencies": [
        "player",
        "staff",
        "match"
      ],
      "sources": [
        "Handleiding",
        "Training savegames",
        "Delegate tests"
      ],
      "timeline": [
        {
          "date": "2026-07-06",
          "title": "Profielwijzigingen geïsoleerd",
          "summary": "Balanced, Offensive en Defensive zijn gecontroleerd opgeslagen."
        },
        {
          "date": "2026-07-12",
          "title": "Individual Training-koppeling bevestigd",
          "summary": "Individuele training gebruikt tijd die in Team Training is gereserveerd."
        }
      ],
      "documents": [
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Functioneel vrijwel compleet; formules nog technisch bewijzen."
      ]
    },
    {
      "id": "tactics",
      "name": "Tactical Engine",
      "group": "Engines",
      "progress": 88,
      "confidence": 90,
      "status": "active",
      "summary": "Formaties, teamorders, spelerorders, marking, coverage en set pieces zijn beschreven.",
      "facts": [
        "Tactiek bestaat uit meerdere situaties",
        "Player Orders vormen een bias op Team Orders",
        "Coverage beïnvloedt belasting"
      ],
      "hypotheses": [
        "Exacte runtime-weging van orders en coverage"
      ],
      "next": "Gecontroleerde wedstrijdbatches met één tactische variabele uitvoeren.",
      "tests": [
        "TM-01 t/m TM-07",
        "Matchscreenshots"
      ],
      "dependencies": [
        "player",
        "match",
        "training"
      ],
      "sources": [
        "Handleiding",
        "TM-tests",
        "Wedstrijdscreenshots"
      ],
      "timeline": [
        {
          "date": "2026-07-07",
          "title": "Team Management-testreeks voltooid",
          "summary": "Opstelling, formatie en vaste spelhervattingen getest."
        },
        {
          "date": "2026-07-12",
          "title": "Situation-based tactics bevestigd",
          "summary": "Tactieken bestaan uit meerdere wedstrijdsituaties."
        }
      ],
      "documents": [
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Exacte impact van coverage en player bias nog meten."
      ]
    },
    {
      "id": "match",
      "name": "Match Engine",
      "group": "Engines",
      "progress": 55,
      "confidence": 62,
      "status": "active",
      "summary": "Niet-deterministische eventgeneratie, live statistieken en dynamische spelersstatus zijn bevestigd.",
      "facts": [
        "Resultaten variëren bij herhaling",
        "Team- en spelerstatistieken worden live bijgehouden",
        "Presentatie staat los van simulatie"
      ],
      "hypotheses": [
        "Centrale event queue",
        "Hidden composite ratings sturen eventkansen"
      ],
      "next": "Dezelfde wedstrijd minimaal tienmaal gecontroleerd simuleren.",
      "tests": [
        "ME-01",
        "Herhaalde wedstrijden"
      ],
      "dependencies": [
        "player",
        "tactics",
        "training",
        "staff"
      ],
      "sources": [
        "Herhaalde wedstrijden",
        "Live statistieken",
        "Handleiding",
        "ME-01"
      ],
      "timeline": [
        {
          "date": "2026-07-11",
          "title": "Niet-determinisme bevestigd",
          "summary": "Dezelfde wedstrijd levert verschillende uitslagen en statistieken."
        },
        {
          "date": "2026-07-11",
          "title": "Runtime player state zichtbaar",
          "summary": "Fitness, morale en aggression worden live bijgewerkt."
        }
      ],
      "documents": [
        "Reverse_Engineering_Logbook_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Hoogste prioriteit: gecontroleerde 10-run benchmark en event-correlaties."
      ]
    },
    {
      "id": "transfer",
      "name": "Transfer & Contract Engine",
      "group": "Engines",
      "progress": 68,
      "confidence": 75,
      "status": "active",
      "summary": "Bod, clubreactie, spelersonderhandeling, contractstatus, shortlist en huur zijn beschreven.",
      "facts": [
        "Club- en spelersonderhandeling zijn aparte fasen",
        "Shortlist werkt als monitoringsysteem"
      ],
      "hypotheses": [
        "AI-biedingsmodel",
        "Waardebepaling en onderhandelingsgewichten"
      ],
      "next": "Een volledige transfer van bod tot inschrijving volgen.",
      "tests": [
        "TR-01/02",
        "PS-01/02"
      ],
      "dependencies": [
        "player",
        "staff",
        "finance"
      ],
      "sources": [
        "TR-01/02",
        "PS-01/02",
        "Handleiding"
      ],
      "timeline": [
        {
          "date": "2026-07-08",
          "title": "Openstaand bod vastgelegd",
          "summary": "Transferbod zonder reactie als geïsoleerde state opgeslagen."
        },
        {
          "date": "2026-07-09",
          "title": "Reactie opgeslagen",
          "summary": "Verandering na clubreactie aan savegame gekoppeld."
        }
      ],
      "documents": [
        "Reverse_Engineering_Logbook_v0.4.md",
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Volledige transferflow nog niet end-to-end getest."
      ]
    },
    {
      "id": "finance",
      "name": "Finance & Banking Engine",
      "group": "Engines",
      "progress": 58,
      "confidence": 68,
      "status": "research",
      "summary": "Tickets, merchandising, sponsoring, leningen, overdraft en projecties zijn functioneel gemodelleerd.",
      "facts": [
        "Ticketprijs beïnvloedt opkomst",
        "Projecties zijn niet zelfcorrigerend",
        "Leningen en overdraft zijn afzonderlijk"
      ],
      "hypotheses": [
        "Attendance-formule",
        "Sponsor- en bank-AI"
      ],
      "next": "Gecontroleerde prijs-, sponsor- en krediettests uitvoeren.",
      "tests": [],
      "dependencies": [
        "supporters",
        "stadium",
        "staff"
      ],
      "sources": [
        "Handleiding"
      ],
      "timeline": [
        {
          "date": "2026-07-12",
          "title": "Finance-model gedocumenteerd",
          "summary": "Tickets, merchandising, sponsoring, loans en overdraft opgenomen."
        }
      ],
      "documents": [
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Nog vrijwel volledig afhankelijk van handleiding; praktijktests nodig."
      ]
    },
    {
      "id": "stadium",
      "name": "Stadium Engine",
      "group": "Engines",
      "progress": 62,
      "confidence": 72,
      "status": "research",
      "summary": "Bouwprojecten hebben een levenscyclus, betalingen, voortgang en onderhoudskosten.",
      "facts": [
        "Gefaseerde betalingen",
        "Onderhoud na oplevering",
        "Faciliteiten beïnvloeden club en supporters"
      ],
      "hypotheses": [
        "Exacte bouwduur en ROI per project"
      ],
      "next": "Bouwproject in savegames isoleren.",
      "tests": [],
      "dependencies": [
        "finance",
        "supporters"
      ],
      "sources": [
        "Handleiding"
      ],
      "timeline": [
        {
          "date": "2026-07-12",
          "title": "Construction lifecycle vastgelegd",
          "summary": "Planning, betaling, voortgang, oplevering en onderhoud beschreven."
        }
      ],
      "documents": [
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md",
        "Domain_Model_Specification_v0.4.md"
      ],
      "notes": [
        "Nog geen gecontroleerde bouwsave beschikbaar."
      ]
    },
    {
      "id": "staff",
      "name": "Staff Engine",
      "group": "Engines",
      "progress": 70,
      "confidence": 78,
      "status": "active",
      "summary": "Persoonlijkheden, relaties, werkdruk, afdelingsrollen, rapporten en delegatie zijn beschreven.",
      "facts": [
        "Staf kan meerdere rollen hebben",
        "Overwerken veroorzaakt klachten",
        "Rapportkwaliteit hangt af van medewerkers"
      ],
      "hypotheses": [
        "Relatiematrix en exacte kwaliteitsmodifiers"
      ],
      "next": "Stafleden met verschillende ratings op dezelfde taak vergelijken.",
      "tests": [],
      "dependencies": [
        "training",
        "player",
        "transfer",
        "finance"
      ],
      "sources": [
        "Handleiding",
        "Editor"
      ],
      "timeline": [
        {
          "date": "2026-07-12",
          "title": "Staff relationships gedocumenteerd",
          "summary": "Persoonlijkheid, werkdruk, afdelingsrollen en delegatie vastgelegd."
        }
      ],
      "documents": [
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Zelfde taak laten uitvoeren door staf met verschillende ratings."
      ]
    },
    {
      "id": "supporters",
      "name": "Supporter Engine",
      "group": "Engines",
      "progress": 48,
      "confidence": 58,
      "status": "research",
      "summary": "Resultaten, ticketprijzen en faciliteiten beïnvloeden tevredenheid, opkomst en omzet.",
      "facts": [
        "Hoge prijzen kunnen opkomst verlagen",
        "Sportief succes verhoogt prijsruimte"
      ],
      "hypotheses": [
        "Invloed van weer, tegenstander, derby en loyaliteit"
      ],
      "next": "Attendance-experimenten met gecontroleerde variabelen.",
      "tests": [],
      "dependencies": [
        "finance",
        "stadium",
        "match"
      ],
      "sources": [
        "Handleiding"
      ],
      "timeline": [
        {
          "date": "2026-07-12",
          "title": "Supporter feedback-loop vastgelegd",
          "summary": "Resultaten, prijzen en faciliteiten beïnvloeden attendance en omzet."
        }
      ],
      "documents": [
        "Engine_Specification_v0.4.md",
        "Knowledge_Graph_v0.4.md"
      ],
      "notes": [
        "Attendance-formule nog volledig onbekend."
      ]
    },
    {
      "id": "competition",
      "name": "Competition Engine",
      "group": "Engines",
      "progress": 40,
      "confidence": 50,
      "status": "research",
      "summary": "Fixtures, standen, bekers, regels, historie en seizoensovergang zijn functioneel aanwezig.",
      "facts": [
        "Wedstrijdregels zijn raadpleegbaar",
        "Historische standen en fixtures worden bewaard"
      ],
      "hypotheses": [
        "Planningalgoritme",
        "Promotie/degradatie en Europese kwalificatie"
      ],
      "next": "Competitie- en seizoenssavegames verzamelen.",
      "tests": [],
      "dependencies": [
        "match",
        "savegame"
      ],
      "sources": [
        "Handleiding",
        "Data-map"
      ],
      "timeline": [
        {
          "date": "2026-07-12",
          "title": "Competition scope vastgelegd",
          "summary": "Fixtures, standen, regels, cups en historie geïnventariseerd."
        }
      ],
      "documents": [
        "Functional_Specification_v0.4.md",
        "Engine_Specification_v0.4.md"
      ],
      "notes": [
        "Seizoensovergang en kwalificatieregels moeten technisch worden bewezen."
      ]
    },
    {
      "id": "executable",
      "name": "Executable Reconstruction",
      "group": "Reverse Engineering",
      "progress": 15,
      "confidence": 20,
      "status": "research",
      "summary": "Ghidra, x32dbg en API Monitor zijn voorbereid; enginegerichte analyse moet nog beginnen.",
      "facts": [
        "UEFA2000b.exe is de werkende executable",
        "DirectDraw rendering is aangeroepen"
      ],
      "hypotheses": [
        "Enginefuncties zijn via data- en stringsreferenties te koppelen"
      ],
      "next": "Player- en save-structuren als eerste in Ghidra lokaliseren.",
      "tests": [
        "Ghidra setup",
        "API Monitor",
        "x32dbg"
      ],
      "dependencies": [
        "savegame",
        "player",
        "match",
        "training",
        "tactics"
      ],
      "sources": [
        "Ghidra",
        "x32dbg",
        "API Monitor"
      ],
      "timeline": [
        {
          "date": "2026-07-06",
          "title": "Ghidra werkend",
          "summary": "UEFA2000b.exe geopend en eerste zoekopdrachten uitgevoerd."
        },
        {
          "date": "2026-07-07",
          "title": "DirectDraw calls gemonitord",
          "summary": "API Monitor bevestigt gebruik van DirectDraw-oppervlakken en blits."
        }
      ],
      "documents": [
        "Reverse_Engineering_Logbook_v0.4.md"
      ],
      "notes": [
        "Start met enginegerichte analyse in plaats van willekeurige codeverkenning."
      ]
    }
  ],
  "updates": [
    {
      "date": "2026-07-13",
      "type": "release",
      "title": "PPCC v1.6 — Savegame Explorer",
      "summary": "Savegame Library, file matrix en differential analysis toegevoegd. Light mode en mobiele menuknop visueel verbeterd."
    },
    {
      "date": "2026-07-13",
      "type": "release",
      "title": "PPCC v1.5 — Research Center",
      "summary": "Modulaire JSON-data, Test Explorer en uitgebreide Evidence Matrix toegevoegd."
    },
    {
      "date": "2026-07-13",
      "type": "release",
      "title": "PPCC v1.4 — Knowledge Graph",
      "summary": "Interactieve kenniskoppelingen tussen engines, objecten en concepten toegevoegd. Overall Progress-weergave grafisch gecorrigeerd."
    },
    {
      "date": "2026-07-13",
      "type": "release",
      "title": "PPCC v1.3 — Engine Explorer",
      "summary": "Engine-detailpagina’s bevatten nu dependencies, bronnen, tijdlijn, documenten en research notes."
    },
    {
      "date": "2026-07-13",
      "type": "release",
      "title": "PPCC v1.2 — Documentation Reader",
      "summary": "Documentatie is nu direct leesbaar en doorzoekbaar in het Command Center."
    },
    {
      "date": "2026-07-13",
      "type": "milestone",
      "title": "PPCC Foundation live",
      "summary": "GitHub Pages, Actions en automatische deployment werken stabiel."
    },
    {
      "date": "2026-07-12",
      "type": "milestone",
      "title": "Handleiding volledig verwerkt",
      "summary": "De volledige originele handleiding is als primaire ontwerpbron opgenomen."
    },
    {
      "date": "2026-07-11",
      "type": "discovery",
      "title": "Wedstrijdsimulatie niet-deterministisch",
      "summary": "Dezelfde wedstrijd levert verschillende uitslagen en statistieken op."
    },
    {
      "date": "2026-07-11",
      "type": "discovery",
      "title": "Dynamische wedstrijdwaarden",
      "summary": "Fitness, morale en aggression worden tijdens wedstrijden bijgewerkt."
    }
  ],
  "documents": [
    {
      "title": "Reverse Engineering Logbook",
      "file": "Reverse_Engineering_Logbook_v0.4.md",
      "type": "Markdown",
      "status": "Actueel",
      "description": "Chronologische tests, observaties en technisch bewijs."
    },
    {
      "title": "Functional Specification",
      "file": "Functional_Specification_v0.4.md",
      "type": "Markdown",
      "status": "Actueel",
      "description": "Wat de originele game functioneel doet."
    },
    {
      "title": "Engine Specification",
      "file": "Engine_Specification_v0.4.md",
      "type": "Markdown",
      "status": "Actueel",
      "description": "Simulatie-engines, afhankelijkheden en open vragen."
    },
    {
      "title": "Domain Model Specification",
      "file": "Domain_Model_Specification_v0.4.md",
      "type": "Markdown",
      "status": "Actueel",
      "description": "Domeinobjecten en relaties."
    },
    {
      "title": "Design Decision Log",
      "file": "Design_Decision_Log_v0.4.md",
      "type": "Markdown",
      "status": "Actueel",
      "description": "Vastgelegde ontwerpkeuzes en fidelity-regels."
    },
    {
      "title": "Knowledge Graph",
      "file": "Knowledge_Graph_v0.4.md",
      "type": "Markdown",
      "status": "Actueel",
      "description": "Concepten en relaties tussen systemen."
    },
    {
      "title": "Requirements Traceability Matrix",
      "file": "Requirements_Traceability_Matrix_v0.3.csv",
      "type": "CSV",
      "status": "Actueel",
      "description": "Bewijs per categorie en bron."
    },
    {
      "title": "Originele handleiding",
      "file": "UEFA_Manager_2000_Manual_EN.pdf",
      "type": "PDF",
      "status": "Bron",
      "description": "Originele Engelstalige UEFA Manager 2000-handleiding."
    }
  ],
  "knowledgeGraph": [
    {
      "id": "world",
      "label": "World",
      "type": "core",
      "x": 50,
      "y": 8,
      "links": [
        "competition",
        "club",
        "manager"
      ]
    },
    {
      "id": "club",
      "label": "Club",
      "type": "core",
      "x": 50,
      "y": 25,
      "links": [
        "player",
        "staff",
        "finance",
        "stadium",
        "supporters",
        "board"
      ]
    },
    {
      "id": "manager",
      "label": "Manager",
      "type": "actor",
      "x": 18,
      "y": 25,
      "links": [
        "club",
        "reputation",
        "staff"
      ]
    },
    {
      "id": "competition",
      "label": "Competition",
      "type": "system",
      "x": 82,
      "y": 24,
      "links": [
        "match",
        "club",
        "savegame"
      ]
    },
    {
      "id": "player",
      "label": "Player",
      "type": "actor",
      "x": 20,
      "y": 50,
      "links": [
        "training",
        "tactics",
        "match",
        "transfer",
        "medical",
        "morale",
        "fitness",
        "potential"
      ]
    },
    {
      "id": "staff",
      "label": "Staff",
      "type": "actor",
      "x": 42,
      "y": 48,
      "links": [
        "training",
        "scouting",
        "medical",
        "transfer"
      ]
    },
    {
      "id": "finance",
      "label": "Finance",
      "type": "system",
      "x": 65,
      "y": 48,
      "links": [
        "stadium",
        "supporters",
        "banking",
        "transfer"
      ]
    },
    {
      "id": "stadium",
      "label": "Stadium",
      "type": "system",
      "x": 83,
      "y": 50,
      "links": [
        "supporters",
        "finance"
      ]
    },
    {
      "id": "training",
      "label": "Training",
      "type": "engine",
      "x": 15,
      "y": 72,
      "links": [
        "fitness",
        "morale",
        "potential",
        "match"
      ]
    },
    {
      "id": "tactics",
      "label": "Tactics",
      "type": "engine",
      "x": 34,
      "y": 70,
      "links": [
        "match",
        "fitness"
      ]
    },
    {
      "id": "match",
      "label": "Match Engine",
      "type": "engine",
      "x": 50,
      "y": 67,
      "links": [
        "morale",
        "fitness",
        "supporters",
        "competition",
        "savegame"
      ]
    },
    {
      "id": "transfer",
      "label": "Transfer",
      "type": "engine",
      "x": 66,
      "y": 69,
      "links": [
        "finance",
        "player",
        "staff"
      ]
    },
    {
      "id": "supporters",
      "label": "Supporters",
      "type": "system",
      "x": 84,
      "y": 70,
      "links": [
        "finance",
        "stadium",
        "match"
      ]
    },
    {
      "id": "fitness",
      "label": "Fitness",
      "type": "concept",
      "x": 18,
      "y": 90,
      "links": [
        "match",
        "medical"
      ]
    },
    {
      "id": "morale",
      "label": "Morale",
      "type": "concept",
      "x": 36,
      "y": 88,
      "links": [
        "match",
        "training",
        "staff"
      ]
    },
    {
      "id": "potential",
      "label": "Potential",
      "type": "concept",
      "x": 52,
      "y": 90,
      "links": [
        "player",
        "training"
      ]
    },
    {
      "id": "medical",
      "label": "Medical",
      "type": "engine",
      "x": 68,
      "y": 88,
      "links": [
        "player",
        "fitness"
      ]
    },
    {
      "id": "savegame",
      "label": "Savegame",
      "type": "engine",
      "x": 84,
      "y": 90,
      "links": [
        "world",
        "match",
        "competition"
      ]
    },
    {
      "id": "board",
      "label": "Board",
      "type": "actor",
      "x": 30,
      "y": 35,
      "links": [
        "manager",
        "finance",
        "stadium",
        "reputation"
      ]
    },
    {
      "id": "reputation",
      "label": "Reputation",
      "type": "concept",
      "x": 11,
      "y": 36,
      "links": [
        "manager",
        "club",
        "player"
      ]
    },
    {
      "id": "scouting",
      "label": "Scouting",
      "type": "engine",
      "x": 57,
      "y": 36,
      "links": [
        "player",
        "transfer",
        "staff"
      ]
    },
    {
      "id": "banking",
      "label": "Banking",
      "type": "system",
      "x": 73,
      "y": 35,
      "links": [
        "finance"
      ]
    }
  ],
  "tests": [
    {
      "id": "BASELINE",
      "title": "Baseline Save",
      "category": "Savegame",
      "status": "verified",
      "confidence": 100,
      "goal": "De vroegst mogelijke consistente referentiesave maken op Football Today.",
      "procedure": [
        "Nieuw spel starten",
        "Manager instellen",
        "Club Oss kiezen",
        "Opslaan bij eerste mogelijkheid"
      ],
      "result": "Baseline voor alle latere differential tests vastgelegd.",
      "conclusion": "Alle latere savegamevergelijkingen kunnen tegen één stabiele referentie worden uitgevoerd.",
      "engines": [
        "savegame"
      ],
      "evidence": {
        "manual": false,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "baseline save set"
      ],
      "screenshots": [],
      "openQuestions": [
        "Welke records veranderen uitsluitend door tijdsverloop?"
      ]
    },
    {
      "id": "DAY-01",
      "title": "Ingame dagen vooruit",
      "category": "Savegame",
      "status": "verified",
      "confidence": 95,
      "goal": "Vaststellen welke savebestanden veranderen door alleen tijd te laten verstrijken.",
      "procedure": [
        "Baseline laden",
        "Meerdere ingame dagen vooruit",
        "Nieuwe save maken",
        "Bestanden vergelijken"
      ],
      "result": "Meerdere savebestanden veranderen zonder handmatige managementactie.",
      "conclusion": "De save bewaart actieve wereldstatus en tijdsafhankelijke subsystemen.",
      "engines": [
        "savegame",
        "competition"
      ],
      "evidence": {
        "manual": false,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "day-forward save set"
      ],
      "screenshots": [],
      "openQuestions": [
        "Welke wijzigingen zijn kalender-, event- of AI-clubgedreven?"
      ]
    },
    {
      "id": "TRAIN-01",
      "title": "Balanced naar Offensive",
      "category": "Training",
      "status": "verified",
      "confidence": 95,
      "goal": "Opslag van een gedelegeerd trainingsprofiel isoleren.",
      "procedure": [
        "Baseline laden",
        "Team Training openen",
        "Delegate gebruiken",
        "Offensive kiezen",
        "Opslaan"
      ],
      "result": "Trainingstatus verandert en relevante savebestanden wijzigen.",
      "conclusion": "Het trainingsprofiel is persistent en maakt deel uit van de simulatiestatus.",
      "engines": [
        "training",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "training-offensive save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Welke bytes representeren profiel versus weekindeling?"
      ]
    },
    {
      "id": "TRAIN-02",
      "title": "Offensive naar Defensive",
      "category": "Training",
      "status": "verified",
      "confidence": 95,
      "goal": "Tweede trainingsprofiel gebruiken om verschillen verder te isoleren.",
      "procedure": [
        "Offensive-save laden",
        "Delegate gebruiken",
        "Defensive kiezen",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Nieuwe, gecontroleerde wijzigingsset verkregen.",
      "conclusion": "Meerdere presets zijn persistent en differentieel te onderzoeken.",
      "engines": [
        "training",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "training-defensive save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Zijn trainingstaken individueel gecodeerd of als profiel-ID opgeslagen?"
      ]
    },
    {
      "id": "TM-01",
      "title": "Twee basisspelers omgewisseld",
      "category": "Team Management",
      "status": "verified",
      "confidence": 95,
      "goal": "Vaststellen hoe de basisopstelling wordt opgeslagen.",
      "procedure": [
        "Baseline laden",
        "Twee spelers in de basis omwisselen",
        "Opslaan",
        "Savebestanden vergelijken"
      ],
      "result": "Gerichte wijzigingen zichtbaar in savebestanden.",
      "conclusion": "Opstellingsvolgorde en/of pitch assignment zijn persistent.",
      "engines": [
        "tactics",
        "player",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TM-01 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Is de opstelling een lijst van player IDs of vaste slots?"
      ]
    },
    {
      "id": "TM-02",
      "title": "Spelerpositie gewijzigd",
      "category": "Team Management",
      "status": "verified",
      "confidence": 92,
      "goal": "Positieassignment los van spelersvolgorde testen.",
      "procedure": [
        "Referentiesave laden",
        "Eén speler naar andere veldpositie verplaatsen",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Positiegerelateerde persistente wijziging aangetoond.",
      "conclusion": "Veldpositie is afzonderlijk opgeslagen van selectievolgorde.",
      "engines": [
        "tactics",
        "player",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TM-02 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Welke enumeratie gebruikt de game voor posities?"
      ]
    },
    {
      "id": "TM-03",
      "title": "Formatie gewijzigd",
      "category": "Team Management",
      "status": "verified",
      "confidence": 95,
      "goal": "Opslag van de gekozen formatie isoleren.",
      "procedure": [
        "Referentiesave laden",
        "Formatie wijzigen",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Formatieverandering persistent vastgelegd.",
      "conclusion": "Formation is een zelfstandig tactisch gegeven.",
      "engines": [
        "tactics",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TM-03 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Wordt formatie als ID of volledige coordinatenset opgeslagen?"
      ]
    },
    {
      "id": "TM-04",
      "title": "Captain gewijzigd",
      "category": "Team Management",
      "status": "verified",
      "confidence": 92,
      "goal": "Captain assignment isoleren.",
      "procedure": [
        "Referentiesave laden",
        "Andere captain selecteren",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Captainwijziging persistent.",
      "conclusion": "Captain is een apart team assignment.",
      "engines": [
        "tactics",
        "player",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TM-04 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Heeft captain runtime-invloed op morale of influence?"
      ]
    },
    {
      "id": "TM-05",
      "title": "Penaltynemer gewijzigd",
      "category": "Team Management",
      "status": "verified",
      "confidence": 92,
      "goal": "Set-piece assignment voor penalty’s testen.",
      "procedure": [
        "Referentiesave laden",
        "Penaltynemer wijzigen",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Assignment persistent.",
      "conclusion": "Penaltynemer is een apart tactisch veld.",
      "engines": [
        "tactics",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TM-05 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Is er een fallbacklijst wanneer de eerste nemer niet speelt?"
      ]
    },
    {
      "id": "TM-06",
      "title": "Vrije trapnemer gewijzigd",
      "category": "Team Management",
      "status": "verified",
      "confidence": 92,
      "goal": "Vrije-trapassignment testen.",
      "procedure": [
        "Referentiesave laden",
        "Vrije trapnemer wijzigen",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Assignment persistent.",
      "conclusion": "Vrije trapnemer is apart opgeslagen.",
      "engines": [
        "tactics",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TM-06 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Zijn links/rechts en afstand afzonderlijke assignments?"
      ]
    },
    {
      "id": "TM-07",
      "title": "Cornernemer gewijzigd",
      "category": "Team Management",
      "status": "verified",
      "confidence": 92,
      "goal": "Cornerassignment testen.",
      "procedure": [
        "Referentiesave laden",
        "Cornernemer wijzigen",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Assignment persistent.",
      "conclusion": "Cornernemer is apart opgeslagen.",
      "engines": [
        "tactics",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TM-07 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Zijn linker- en rechtercorners gescheiden?"
      ]
    },
    {
      "id": "PS-01",
      "title": "Contractvoorstel openstaand",
      "category": "Player / Contract",
      "status": "verified",
      "confidence": 90,
      "goal": "State vastleggen nadat een contractverlengingsvoorstel is gedaan maar nog niet beantwoord.",
      "procedure": [
        "Speler openen",
        "Contractvoorstel doen",
        "Niet verder simuleren",
        "Opslaan"
      ],
      "result": "Openstaande contractonderhandeling als nieuwe save-state vastgelegd.",
      "conclusion": "Contractoffer en response state zijn persistent.",
      "engines": [
        "transfer",
        "player",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "PS-01 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Waar worden voorwaarden en status afzonderlijk opgeslagen?"
      ]
    },
    {
      "id": "PS-02",
      "title": "Reactie op contractvoorstel",
      "category": "Player / Contract",
      "status": "verified",
      "confidence": 90,
      "goal": "Verandering na reactie op contractvoorstel isoleren.",
      "procedure": [
        "PS-01 laden",
        "Tijd vooruit tot reactie",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Nieuwe contractstatus zichtbaar in saveverschillen.",
      "conclusion": "Onderhandeling heeft meerdere persistente fasen.",
      "engines": [
        "transfer",
        "player",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "PS-02 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Welke statussen bestaan exact?"
      ]
    },
    {
      "id": "TR-01",
      "title": "Transferbod openstaand",
      "category": "Transfers",
      "status": "verified",
      "confidence": 90,
      "goal": "Een uitgaand transferbod zonder reactie vastleggen.",
      "procedure": [
        "Speler selecteren",
        "Bod uitbrengen",
        "Niet verder simuleren",
        "Opslaan"
      ],
      "result": "Openstaand transferbod persistent vastgelegd.",
      "conclusion": "TransferOffer is een zelfstandig object of record.",
      "engines": [
        "transfer",
        "finance",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TR-01 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Waar staan fee, club, speler en status?"
      ]
    },
    {
      "id": "TR-02",
      "title": "Reactie op transferbod",
      "category": "Transfers",
      "status": "verified",
      "confidence": 90,
      "goal": "Reactiestatus na clubbesluit isoleren.",
      "procedure": [
        "TR-01 laden",
        "Tijd vooruit tot reactie",
        "Opslaan",
        "Vergelijken"
      ],
      "result": "Nieuwe transferstatus persistent zichtbaar.",
      "conclusion": "Clubbesluit is een aparte fase vóór speleronderhandeling.",
      "engines": [
        "transfer",
        "finance",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "TR-02 save"
      ],
      "screenshots": [],
      "openQuestions": [
        "Hoe wordt tegenbod of afwijzing gecodeerd?"
      ]
    },
    {
      "id": "ME-01",
      "title": "Eerste officiële wedstrijd",
      "category": "Match",
      "status": "verified",
      "confidence": 95,
      "goal": "Effect van een gespeelde wedstrijd op savegame en wereldstatus vaststellen.",
      "procedure": [
        "Pre-match save laden",
        "Wedstrijd spelen",
        "Na wedstrijd opslaan",
        "Bestanden vergelijken"
      ],
      "result": ".mhs groeit sterk; meerdere runtime- en historievelden veranderen.",
      "conclusion": "Wedstrijdresultaat, events en historie worden uitgebreid persistent opgeslagen.",
      "engines": [
        "match",
        "player",
        "competition",
        "savegame"
      ],
      "evidence": {
        "manual": true,
        "test": true,
        "savegame": true,
        "executable": false
      },
      "files": [
        "ME-01 pre-match",
        "ME-01 post-match"
      ],
      "screenshots": [
        "Live match statistics",
        "Dynamic player values"
      ],
      "openQuestions": [
        "Welke events worden afzonderlijk opgeslagen?",
        "Is random seed persistent?"
      ]
    }
  ],
  "savegames": [
    {
      "id": "baseline",
      "name": "Baseline",
      "date": "2026-07-06",
      "category": "Reference",
      "status": "verified",
      "description": "Eerste mogelijke save op Football Today; vaste referentie voor differential analysis.",
      "relatedTests": [
        "BASELINE"
      ],
      "files": [
        {
          "name": "career.sav",
          "type": "Core state",
          "change": "Reference",
          "size": "Unknown",
          "confidence": 85
        },
        {
          "name": "career.bin",
          "type": "Binary state",
          "change": "Reference",
          "size": "Unknown",
          "confidence": 72
        },
        {
          "name": "career.chs",
          "type": "Club history/state",
          "change": "Reference",
          "size": "Unknown",
          "confidence": 55
        },
        {
          "name": "career.mhs",
          "type": "Match history",
          "change": "Reference",
          "size": "Unknown",
          "confidence": 60
        },
        {
          "name": "career.phs",
          "type": "Player history/state",
          "change": "Reference",
          "size": "Unknown",
          "confidence": 45
        },
        {
          "name": "career.dhs",
          "type": "Division history/state",
          "change": "Reference",
          "size": "Unknown",
          "confidence": 40
        }
      ],
      "notes": [
        "Gebruik deze save als nulpunt voor alle binaire vergelijkingen."
      ]
    },
    {
      "id": "day-forward",
      "name": "Day Forward",
      "date": "2026-07-06",
      "category": "Time progression",
      "status": "verified",
      "description": "Meerdere ingame dagen vooruit zonder gerichte managementwijziging.",
      "relatedTests": [
        "DAY-01"
      ],
      "files": [
        {
          "name": "career.sav",
          "type": "Core state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 80
        },
        {
          "name": "career.bin",
          "type": "Binary state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 75
        },
        {
          "name": "career.chs",
          "type": "Club history/state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 65
        }
      ],
      "notes": [
        "Geschikt om kalender-, event- en AI-clubwijzigingen te isoleren."
      ]
    },
    {
      "id": "training-offensive",
      "name": "Training Offensive",
      "date": "2026-07-06",
      "category": "Training",
      "status": "verified",
      "description": "Teamtraining gewijzigd van Balanced naar Offensive via Delegate.",
      "relatedTests": [
        "TRAIN-01"
      ],
      "files": [
        {
          "name": "career.sav",
          "type": "Core state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 85
        },
        {
          "name": "career.bin",
          "type": "Binary state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 82
        }
      ],
      "notes": [
        "Kandidaat voor het lokaliseren van profiel-ID en weekschema."
      ]
    },
    {
      "id": "training-defensive",
      "name": "Training Defensive",
      "date": "2026-07-06",
      "category": "Training",
      "status": "verified",
      "description": "Teamtraining gewijzigd van Offensive naar Defensive.",
      "relatedTests": [
        "TRAIN-02"
      ],
      "files": [
        {
          "name": "career.sav",
          "type": "Core state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 85
        },
        {
          "name": "career.bin",
          "type": "Binary state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 82
        }
      ],
      "notes": [
        "Tweede profiel maakt differential triangulation mogelijk."
      ]
    },
    {
      "id": "tm-01",
      "name": "TM-01 Line-up Swap",
      "date": "2026-07-07",
      "category": "Team Management",
      "status": "verified",
      "description": "Twee basisspelers omgewisseld.",
      "relatedTests": [
        "TM-01"
      ],
      "files": [
        {
          "name": "career.sav",
          "type": "Core state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 90
        },
        {
          "name": "career.bin",
          "type": "Binary state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 85
        }
      ],
      "notes": [
        "Waarschijnlijk player IDs, slots of pitch assignments."
      ]
    },
    {
      "id": "tr-01",
      "name": "TR-01 Open Transfer Offer",
      "date": "2026-07-08",
      "category": "Transfers",
      "status": "verified",
      "description": "Transferbod uitgebracht; reactie nog niet ontvangen.",
      "relatedTests": [
        "TR-01"
      ],
      "files": [
        {
          "name": "career.sav",
          "type": "Core state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 88
        },
        {
          "name": "career.chs",
          "type": "Club history/state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 78
        }
      ],
      "notes": [
        "Belangrijk voor TransferOffer recordstructuur."
      ]
    },
    {
      "id": "me-01-post",
      "name": "ME-01 Post Match",
      "date": "2026-07-11",
      "category": "Match",
      "status": "verified",
      "description": "Save direct na de eerste officiële wedstrijd.",
      "relatedTests": [
        "ME-01"
      ],
      "files": [
        {
          "name": "career.sav",
          "type": "Core state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 90
        },
        {
          "name": "career.bin",
          "type": "Binary state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 85
        },
        {
          "name": "career.mhs",
          "type": "Match history",
          "change": "Strong growth",
          "size": "Larger",
          "confidence": 95
        },
        {
          "name": "career.chs",
          "type": "Club history/state",
          "change": "Changed",
          "size": "Unknown",
          "confidence": 82
        }
      ],
      "notes": [
        "Beste kandidaat voor het identificeren van match events, result history en dynamic player state."
      ]
    }
  ]
};
