window.PPCC_DATA = {
  "version": "1.8",
  "updated": "16 juli 2026 — v1.8",
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
      "date": "2026-07-16",
      "type": "release",
      "title": "PPCC v1.8 — Engine Registry v1.0",
      "summary": "Engine taxonomy, Discovery Registry, Design Principles and PPAS screen chapters added."
    },
    {
      "date": "2026-07-13",
      "type": "release",
      "title": "PPCC v1.7 — Executable Explorer",
      "summary": "Modules, functies, structuren, adresregister en cross references toegevoegd."
    },
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
  ],
  "executableModules": [
    {
      "id": "uefa2000b",
      "name": "UEFA2000b.exe",
      "type": "Primary executable",
      "format": "PE32",
      "architecture": "x86 / 32-bit",
      "status": "active",
      "confidence": 100,
      "description": "Werkende executable op moderne Windows-systemen en primaire target voor Ghidra en x32dbg.",
      "tools": [
        "Ghidra",
        "x32dbg",
        "API Monitor"
      ],
      "notes": [
        "UEFA2000.exe geeft een zwart scherm; UEFA2000b.exe is de werkende target.",
        "DirectDraw-calls zijn via API Monitor waargenomen.",
        "Start met enginegerichte analyse in plaats van willekeurige codeverkenning."
      ]
    },
    {
      "id": "ddraw",
      "name": "DirectDraw runtime",
      "type": "Graphics dependency",
      "format": "Win32 API / COM",
      "architecture": "x86 / 32-bit",
      "status": "research",
      "confidence": 78,
      "description": "Renderinglaag voor surfaces, Blt/BltFast, display modes en presentatie.",
      "tools": [
        "API Monitor",
        "x32dbg"
      ],
      "notes": [
        "De game rendert intern in het oorspronkelijke 800×600-gebied.",
        "BltFast is een belangrijk breakpoint voor het lokaliseren van de renderpipeline."
      ]
    }
  ],
  "executableFunctions": [
    {
      "id": "FUN_RENDER_BLTFAST",
      "address": "Unknown",
      "name": "DirectDraw BltFast call path",
      "module": "uefa2000b",
      "engine": "executable",
      "category": "Rendering",
      "status": "hypothesis",
      "confidence": 42,
      "description": "Call path die het interne 800×600 backbuffer-gebied naar het zichtbare oppervlak kopieert.",
      "signature": "IDirectDrawSurface::BltFast(...)",
      "calls": [
        "DirectDraw surface methods"
      ],
      "crossReferences": [
        "API Monitor hits",
        "x32dbg breakpoint research"
      ],
      "evidence": [
        "API Monitor",
        "Widescreen patch tests"
      ],
      "relatedTests": [],
      "relatedSavegames": [],
      "notes": [
        "Nog geen stabiel codeadres vastgelegd.",
        "Waarschijnlijk cruciaal voor widescreen-scaling en het zwarte gebied buiten 800×600."
      ],
      "openQuestions": [
        "Welke caller in UEFA2000b.exe roept BltFast aan?",
        "Wordt de source rect hardcoded of afgeleid van de surface?"
      ]
    },
    {
      "id": "FUN_SAVEGAME_WRITE",
      "address": "Unknown",
      "name": "Savegame write coordinator",
      "module": "uefa2000b",
      "engine": "savegame",
      "category": "Persistence",
      "status": "planned",
      "confidence": 25,
      "description": "Vermoedelijke centrale coördinator die de modulaire savebestanden schrijft.",
      "signature": "Unknown",
      "calls": [
        "File I/O",
        "Subsystem serializers"
      ],
      "crossReferences": [
        "Baseline",
        "TM-01 t/m TM-07",
        "TR-01/02",
        "ME-01"
      ],
      "evidence": [
        "Differential save tests"
      ],
      "relatedTests": [
        "BASELINE",
        "TM-01",
        "TR-01",
        "ME-01"
      ],
      "relatedSavegames": [
        "baseline",
        "tm-01",
        "tr-01",
        "me-01-post"
      ],
      "notes": [
        "Te vinden via breakpoints op CreateFile/WriteFile tijdens opslaan.",
        "Waarschijnlijk splitst de functie output over meerdere extensies."
      ],
      "openQuestions": [
        "Bestaat er één coordinator of schrijft ieder subsysteem zelfstandig?",
        "Zijn checksums of compressie aanwezig?"
      ]
    },
    {
      "id": "FUN_TRAINING_PROFILE",
      "address": "Unknown",
      "name": "Training profile apply",
      "module": "uefa2000b",
      "engine": "training",
      "category": "Simulation",
      "status": "planned",
      "confidence": 35,
      "description": "Past een preset of custom weekschema toe op de actieve club.",
      "signature": "Unknown",
      "calls": [
        "Training schedule update",
        "Savegame state update"
      ],
      "crossReferences": [
        "Balanced → Offensive",
        "Offensive → Defensive"
      ],
      "evidence": [
        "Handleiding",
        "Training savegames"
      ],
      "relatedTests": [
        "TRAIN-01",
        "TRAIN-02"
      ],
      "relatedSavegames": [
        "training-offensive",
        "training-defensive"
      ],
      "notes": [
        "Goede eerste enginefunctie omdat input en output gecontroleerd zijn.",
        "Zoek naar UI-stringreferenties rond Balanced, Offensive, Defensive of Delegate."
      ],
      "openQuestions": [
        "Is een preset alleen een ID of een volledige reeks trainingsslots?",
        "Wanneer worden development- en fatigue-effecten berekend?"
      ]
    },
    {
      "id": "FUN_MATCH_EVENT",
      "address": "Unknown",
      "name": "Match event generator",
      "module": "uefa2000b",
      "engine": "match",
      "category": "Simulation",
      "status": "planned",
      "confidence": 28,
      "description": "Vermoedelijke functie of functiegroep die schoten, goals, kaarten en blessures genereert.",
      "signature": "Unknown",
      "calls": [
        "Random number generation",
        "Player runtime state",
        "Match statistics"
      ],
      "crossReferences": [
        "ME-01",
        "Herhaalde wedstrijdtests"
      ],
      "evidence": [
        "Live statistics",
        "Non-deterministic results"
      ],
      "relatedTests": [
        "ME-01"
      ],
      "relatedSavegames": [
        "me-01-post"
      ],
      "notes": [
        "Waarschijnlijk geen enkele monolithische functie maar een event pipeline.",
        "Random seed en event queue zijn nog hypotheses."
      ],
      "openQuestions": [
        "Waar wordt de random state bijgehouden?",
        "Welke composite player values bepalen eventkansen?"
      ]
    }
  ],
  "executableStructures": [
    {
      "id": "STRUCT_PLAYER",
      "name": "Player record",
      "module": "uefa2000b",
      "engine": "player",
      "status": "hypothesis",
      "confidence": 38,
      "size": "Unknown",
      "description": "Runtime- of persistente structuur met skills, hidden attributes en statuswaarden.",
      "fields": [
        {
          "offset": "?",
          "name": "Visible skills",
          "type": "8 values",
          "status": "confirmed concept"
        },
        {
          "offset": "?",
          "name": "Fitness",
          "type": "integer",
          "status": "runtime observed"
        },
        {
          "offset": "?",
          "name": "Morale",
          "type": "integer",
          "status": "runtime observed"
        },
        {
          "offset": "?",
          "name": "Potential",
          "type": "integer",
          "status": "manual/editor"
        },
        {
          "offset": "?",
          "name": "Hidden attributes",
          "type": "multiple values",
          "status": "manual confirmed"
        }
      ],
      "relatedFunctions": [
        "FUN_MATCH_EVENT"
      ],
      "notes": [
        "Editor toont een groot deel van het conceptuele record, maar niet de echte geheugenlayout."
      ]
    },
    {
      "id": "STRUCT_TRAINING",
      "name": "Training schedule",
      "module": "uefa2000b",
      "engine": "training",
      "status": "hypothesis",
      "confidence": 45,
      "size": "Unknown",
      "description": "Weekplanning met dag- en tijdslots plus profielstatus.",
      "fields": [
        {
          "offset": "?",
          "name": "Profile ID",
          "type": "enum",
          "status": "hypothesis"
        },
        {
          "offset": "?",
          "name": "Weekly slots",
          "type": "array",
          "status": "manual confirmed concept"
        },
        {
          "offset": "?",
          "name": "Individual training time",
          "type": "derived or stored",
          "status": "manual confirmed concept"
        }
      ],
      "relatedFunctions": [
        "FUN_TRAINING_PROFILE"
      ],
      "notes": [
        "Differential saves maken deze structuur geschikt voor vroege reconstructie."
      ]
    },
    {
      "id": "STRUCT_MATCH_EVENT",
      "name": "Match event",
      "module": "uefa2000b",
      "engine": "match",
      "status": "hypothesis",
      "confidence": 30,
      "size": "Unknown",
      "description": "Eventrecord voor doelpunt, kaart, blessure, wissel of statistische actie.",
      "fields": [
        {
          "offset": "?",
          "name": "Minute / tick",
          "type": "integer",
          "status": "UI observed"
        },
        {
          "offset": "?",
          "name": "Event type",
          "type": "enum",
          "status": "manual/UI observed"
        },
        {
          "offset": "?",
          "name": "Primary player",
          "type": "player reference",
          "status": "UI observed"
        },
        {
          "offset": "?",
          "name": "Secondary player",
          "type": "player reference",
          "status": "hypothesis"
        }
      ],
      "relatedFunctions": [
        "FUN_MATCH_EVENT"
      ],
      "notes": [
        "Kan zowel runtime als in .mhs een afgeleide vorm hebben."
      ]
    }
  ],
  "executableAddresses": [
    {
      "address": "0x00000000",
      "label": "Placeholder — BltFast caller",
      "module": "uefa2000b",
      "kind": "Code",
      "status": "unresolved",
      "confidence": 0,
      "engine": "executable",
      "notes": "Vervangen zodra x32dbg een stabiele caller toont."
    },
    {
      "address": "0x00000000",
      "label": "Placeholder — Save coordinator",
      "module": "uefa2000b",
      "kind": "Code",
      "status": "unresolved",
      "confidence": 0,
      "engine": "savegame",
      "notes": "Te vinden via WriteFile-breakpoints tijdens Save."
    }
  ],
  "engineRegistryV1": [
    {
      "id": "player",
      "name": "Player Engine",
      "domain": "Core Simulation",
      "status": "active",
      "progress": 62,
      "confidence": 68
    },
    {
      "id": "team",
      "name": "Team Engine",
      "domain": "Core Simulation",
      "status": "active",
      "progress": 58,
      "confidence": 70
    },
    {
      "id": "club",
      "name": "Club Engine",
      "domain": "Core Simulation",
      "status": "research",
      "progress": 45,
      "confidence": 58
    },
    {
      "id": "competition",
      "name": "Competition Engine",
      "domain": "Core Simulation",
      "status": "research",
      "progress": 40,
      "confidence": 50
    },
    {
      "id": "match",
      "name": "Match Engine",
      "domain": "Core Simulation",
      "status": "active",
      "progress": 55,
      "confidence": 62
    },
    {
      "id": "calendar",
      "name": "Calendar Engine",
      "domain": "Core Simulation",
      "status": "research",
      "progress": 46,
      "confidence": 61
    },
    {
      "id": "finance",
      "name": "Finance Engine",
      "domain": "Core Simulation",
      "status": "active",
      "progress": 58,
      "confidence": 68
    },
    {
      "id": "formation",
      "name": "Formation Engine",
      "domain": "Tactical Systems",
      "status": "active",
      "progress": 78,
      "confidence": 90
    },
    {
      "id": "role",
      "name": "Role Engine",
      "domain": "Tactical Systems",
      "status": "active",
      "progress": 76,
      "confidence": 88
    },
    {
      "id": "team-orders",
      "name": "Team Orders Engine",
      "domain": "Tactical Systems",
      "status": "active",
      "progress": 62,
      "confidence": 72
    },
    {
      "id": "set-piece",
      "name": "Set Piece Engine",
      "domain": "Tactical Systems",
      "status": "research",
      "progress": 38,
      "confidence": 48
    },
    {
      "id": "delegate-ai",
      "name": "Delegate AI Engine",
      "domain": "Tactical Systems",
      "status": "active",
      "progress": 64,
      "confidence": 78
    },
    {
      "id": "transfer",
      "name": "Transfer Engine",
      "domain": "Management",
      "status": "active",
      "progress": 68,
      "confidence": 75
    },
    {
      "id": "contract",
      "name": "Contract Engine",
      "domain": "Management",
      "status": "active",
      "progress": 64,
      "confidence": 72
    },
    {
      "id": "training",
      "name": "Training Engine",
      "domain": "Management",
      "status": "active",
      "progress": 90,
      "confidence": 92
    },
    {
      "id": "staff",
      "name": "Staff Engine",
      "domain": "Management",
      "status": "active",
      "progress": 70,
      "confidence": 78
    },
    {
      "id": "youth",
      "name": "Youth Engine",
      "domain": "Management",
      "status": "research",
      "progress": 35,
      "confidence": 44
    },
    {
      "id": "scouting",
      "name": "Scouting Engine",
      "domain": "Management",
      "status": "research",
      "progress": 46,
      "confidence": 58
    },
    {
      "id": "news",
      "name": "News Engine",
      "domain": "World Simulation",
      "status": "research",
      "progress": 42,
      "confidence": 60
    },
    {
      "id": "notification",
      "name": "Notification Engine",
      "domain": "World Simulation",
      "status": "active",
      "progress": 69,
      "confidence": 84
    },
    {
      "id": "stadium",
      "name": "Stadium Development Engine",
      "domain": "World Simulation",
      "status": "active",
      "progress": 62,
      "confidence": 72
    },
    {
      "id": "sponsor",
      "name": "Sponsor Engine",
      "domain": "World Simulation",
      "status": "research",
      "progress": 41,
      "confidence": 53
    },
    {
      "id": "board",
      "name": "Board Engine",
      "domain": "World Simulation",
      "status": "research",
      "progress": 43,
      "confidence": 55
    },
    {
      "id": "supporters",
      "name": "Fan / Supporter Engine",
      "domain": "World Simulation",
      "status": "research",
      "progress": 48,
      "confidence": 58
    },
    {
      "id": "savegame",
      "name": "Savegame Engine",
      "domain": "Technical",
      "status": "active",
      "progress": 70,
      "confidence": 72
    },
    {
      "id": "database",
      "name": "Database Engine",
      "domain": "Technical",
      "status": "research",
      "progress": 28,
      "confidence": 35
    },
    {
      "id": "ui-framework",
      "name": "UI Framework",
      "domain": "Technical",
      "status": "active",
      "progress": 74,
      "confidence": 88
    },
    {
      "id": "audio",
      "name": "Audio Engine",
      "domain": "Technical",
      "status": "research",
      "progress": 12,
      "confidence": 20
    },
    {
      "id": "executable",
      "name": "Executable Reconstruction",
      "domain": "Technical",
      "status": "research",
      "progress": 15,
      "confidence": 20
    },
    {
      "id": "statistics",
      "name": "Statistics Engine",
      "domain": "Analytics",
      "status": "research",
      "progress": 44,
      "confidence": 56
    },
    {
      "id": "history",
      "name": "History Engine",
      "domain": "Analytics",
      "status": "research",
      "progress": 47,
      "confidence": 61
    },
    {
      "id": "forecast",
      "name": "Forecast Engine",
      "domain": "Analytics",
      "status": "research",
      "progress": 54,
      "confidence": 76
    }
  ],
  "discoveries": [
    {
      "id": "AD-001",
      "title": "Multiplayer is part of New Game initialization",
      "confidence": 100,
      "screens": [
        "001-006"
      ],
      "engines": [
        "team",
        "club",
        "savegame"
      ],
      "summary": "Setup Managers supports up to four human managers before the game world begins.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-008",
      "title": "Budget forecast is dynamically recalculated",
      "confidence": 100,
      "screens": [
        "007-008"
      ],
      "engines": [
        "forecast",
        "finance",
        "staff"
      ],
      "summary": "The orange forecast line responds continuously to financial decisions and staff quality.",
      "confirmedBy": [
        "screenshot",
        "gameplay",
        "manual"
      ]
    },
    {
      "id": "AD-010",
      "title": "Quick Access is event-driven",
      "confidence": 100,
      "screens": [
        "007-008"
      ],
      "engines": [
        "notification",
        "calendar",
        "news",
        "stadium"
      ],
      "summary": "Icons activate only when information or action is relevant and route to the target screen.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-020",
      "title": "Players have a role-rating matrix",
      "confidence": 100,
      "screens": [
        "009a"
      ],
      "engines": [
        "player",
        "role"
      ],
      "summary": "Every player has a rating for every available role.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-023",
      "title": "Role preference is separate from role rating",
      "confidence": 100,
      "screens": [
        "009a"
      ],
      "engines": [
        "player",
        "role"
      ],
      "summary": "Favourite and comfortable roles are stored independently from numeric role ratings.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-026",
      "title": "Player rows are compact status dashboards",
      "confidence": 100,
      "screens": [
        "009"
      ],
      "engines": [
        "player",
        "ui-framework",
        "transfer"
      ],
      "summary": "Nationality, transfer, discipline, medical and retirement states appear as independent icons.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-037",
      "title": "Team Selection adapts to match rules",
      "confidence": 100,
      "screens": [
        "010"
      ],
      "engines": [
        "team",
        "competition",
        "ui-framework"
      ],
      "summary": "Substitute slots and automatic bench filling follow the forthcoming fixture rules.",
      "confirmedBy": [
        "screenshot",
        "gameplay",
        "manual"
      ]
    },
    {
      "id": "AD-042",
      "title": "Delegate optimizes the complete match setup",
      "confidence": 100,
      "screens": [
        "011"
      ],
      "engines": [
        "delegate-ai",
        "formation",
        "role",
        "team"
      ],
      "summary": "Delegate may change formation, line-up and team assignments while respecting availability.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-047",
      "title": "Pitch Tactics uses a sixteen-zone grid",
      "confidence": 100,
      "screens": [
        "012"
      ],
      "engines": [
        "formation",
        "role",
        "ui-framework"
      ],
      "summary": "Dragging a player resolves to one of sixteen tactical role zones.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-051",
      "title": "Named custom tactics form a persistent library",
      "confidence": 100,
      "screens": [
        "012a",
        "012b"
      ],
      "engines": [
        "formation",
        "savegame",
        "ui-framework"
      ],
      "summary": "Multiple named tactics can be stored and selected through Your Tactics.",
      "confirmedBy": [
        "screenshot",
        "gameplay"
      ]
    },
    {
      "id": "AD-054",
      "title": "A tactic contains multiple editing modes",
      "confidence": 100,
      "screens": [
        "012c"
      ],
      "engines": [
        "formation",
        "team-orders",
        "set-piece"
      ],
      "summary": "Formation, Marking, Coverage and set pieces are edited in the same pitch interface.",
      "confirmedBy": [
        "screenshot"
      ]
    }
  ],
  "designPrinciples": [
    {
      "id": "DP-001",
      "title": "Context before complexity",
      "summary": "Show information when it becomes relevant and route directly to the action.",
      "examples": [
        "Quick Access",
        "Football Today"
      ]
    },
    {
      "id": "DP-002",
      "title": "Flexibility without simplification",
      "summary": "Players can perform every role with different effectiveness.",
      "examples": [
        "Role matrix",
        "Preferred roles"
      ]
    },
    {
      "id": "DP-003",
      "title": "Dense information, minimal clicks",
      "summary": "Compact iconography exposes critical status in player rows.",
      "examples": [
        "Player status icons",
        "Normal View"
      ]
    },
    {
      "id": "DP-004",
      "title": "Intelligent automation",
      "summary": "Automate routine work without taking away control.",
      "examples": [
        "Delegate",
        "Automatic bench fill"
      ]
    },
    {
      "id": "DP-005",
      "title": "Inform, do not restrict",
      "summary": "Adapt the interface to rules instead of repeatedly blocking the user.",
      "examples": [
        "Match Rules"
      ]
    },
    {
      "id": "DP-009",
      "title": "Visual configuration over numeric configuration",
      "summary": "Tactics are edited directly on the pitch.",
      "examples": [
        "Pitch Tactics"
      ]
    },
    {
      "id": "DP-010",
      "title": "One editor, many contexts",
      "summary": "The same field editor handles formation, marking, coverage and set pieces.",
      "examples": [
        "Mode menu"
      ]
    }
  ],
  "screenAnalyses": [
    {
      "id": "009",
      "chapter": "3.1",
      "title": "Team Selection",
      "category": "03 Team Management",
      "purpose": "Build and review the match squad, bench, reserves and assignments.",
      "engines": [
        "team",
        "player",
        "role",
        "formation",
        "ui-framework"
      ],
      "ui": [
        "Starting Eleven",
        "Substitutes",
        "Reserves",
        "Team Assignments",
        "Pitch preview",
        "View Mode",
        "Your Tactics",
        "Rules",
        "Delegate",
        "Status icons"
      ],
      "workflow": [
        "Review availability",
        "Choose tactic",
        "Arrange squad",
        "Review assignments"
      ],
      "discoveries": [
        "AD-020",
        "AD-023",
        "AD-026"
      ],
      "principles": [
        "DP-002",
        "DP-003",
        "DP-004"
      ],
      "reverseTargets": [
        "Role rating matrix",
        "Preferred role mask",
        "Assignment player IDs",
        "Status flags"
      ],
      "openQuestions": [
        "Exact role-rating formula"
      ],
      "validation": {
        "screenshot": true,
        "gameplay": true,
        "manual": true,
        "savegame": true,
        "executable": false
      }
    },
    {
      "id": "010",
      "chapter": "3.2",
      "title": "Match Rules",
      "category": "03 Team Management",
      "purpose": "Display forthcoming fixture rules while Team Selection adapts automatically.",
      "engines": [
        "competition",
        "team",
        "ui-framework"
      ],
      "ui": [
        "Match Rules popup",
        "Substitute count"
      ],
      "workflow": [
        "Open Rules",
        "Review",
        "Close"
      ],
      "discoveries": [
        "AD-037"
      ],
      "principles": [
        "DP-004",
        "DP-005"
      ],
      "reverseTargets": [
        "Fixture rules object",
        "Allowed substitute count"
      ],
      "openQuestions": [
        "Which additional rules vary?"
      ],
      "validation": {
        "screenshot": true,
        "gameplay": true,
        "manual": true,
        "savegame": false,
        "executable": false
      }
    },
    {
      "id": "011",
      "chapter": "3.3",
      "title": "Team Selection Delegate",
      "category": "03 Team Management",
      "purpose": "Generate a valid tactic, line-up and assignments through assistant AI.",
      "engines": [
        "delegate-ai",
        "formation",
        "role",
        "team"
      ],
      "ui": [
        "Delegate dialog",
        "Style selection"
      ],
      "workflow": [
        "Choose style",
        "Confirm",
        "Review result",
        "Adjust manually"
      ],
      "discoveries": [
        "AD-042"
      ],
      "principles": [
        "DP-004"
      ],
      "reverseTargets": [
        "AutoSelectTeam",
        "Formation heuristic",
        "Role preference evaluator"
      ],
      "openQuestions": [
        "One-shot or persistent?"
      ],
      "validation": {
        "screenshot": true,
        "gameplay": true,
        "manual": true,
        "savegame": false,
        "executable": false
      }
    },
    {
      "id": "012",
      "chapter": "3.4",
      "title": "Pitch Tactics",
      "category": "03 Team Management",
      "purpose": "Create, edit, save and load tactics through a shared pitch editor.",
      "engines": [
        "formation",
        "role",
        "team-orders",
        "set-piece",
        "savegame",
        "ui-framework"
      ],
      "ui": [
        "Your Tactics",
        "Mode",
        "Opposition",
        "Sixteen-zone pitch",
        "Drag and drop",
        "Save dialog",
        "Named tactics"
      ],
      "workflow": [
        "Choose tactic",
        "Choose mode",
        "Drag players",
        "Autosave working tactic",
        "Save named preset"
      ],
      "discoveries": [
        "AD-047",
        "AD-051",
        "AD-054"
      ],
      "principles": [
        "DP-009",
        "DP-010"
      ],
      "reverseTargets": [
        "Zone enumeration",
        "Zone-to-role mapping",
        "Named tactic records",
        "Mode layouts"
      ],
      "openQuestions": [
        "Marking",
        "Coverage",
        "Opposition",
        "Substitute mode"
      ],
      "validation": {
        "screenshot": true,
        "gameplay": true,
        "manual": true,
        "savegame": false,
        "executable": false
      }
    }
  ]
};
