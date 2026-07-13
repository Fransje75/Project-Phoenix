window.PPCC_DATA = {
  "version": "1.3",
  "updated": "13 juli 2026 — v1.3",
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
  ]
};
