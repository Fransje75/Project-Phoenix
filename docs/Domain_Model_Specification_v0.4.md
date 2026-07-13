# Project Phoenix — Domain Model Specification v0.4

## Kernobjecten
- World / GameSession
- Manager
- Club
- Board
- Player
- YouthPlayer / YouthSystem
- StaffMember / Department
- Competition
- Fixture
- Match
- MatchEvent
- TacticPreset / TacticalSituation
- TrainingProfile / WeeklySchedule
- Contract / ContractOffer
- Transfer / TransferOffer
- LoanContract
- ShortlistEntry
- ScoutAssignment / ScoutReport
- Injury / MedicalReport
- SponsorContract
- FinanceAccount / Loan / Overdraft
- Stadium / Facility / ConstructionProject
- SupporterBase
- MailMessage / Task / DepartmentReport

## Belangrijkste relaties
- World bevat competities, clubs, managers, spelers en staf.
- Club bezit selectie, staf, stadion, financiën en jeugdstructuur.
- Player heeft contract, club, attributen, runtime-status, historie en relaties.
- Match bevat deelnemers, events, statistieken en resultaat.
- Transfer verbindt speler, verkopende club, kopende club, bieding en contractonderhandeling.
- ConstructionProject verbindt stadion, finance, board en tijd.
- DepartmentReport verbindt een afdeling of staflid met een managerbeslissing.
