# Barista Mourouj — Project Initiation Simulator v1.1

Interactive classroom simulator for Chapter 3, *Initiating Projects*.

## Scenario
Opening a fictional Barista branch in Mourouj. All dates, financial figures, thresholds and simulator effects are explicitly classroom simulation assumptions and are not presented as real Barista data.

## Chapter 3 flow
Pre-initiation → Business case → Stakeholders → Scope → Constraints → Approach → Project Charter → Kick-off → Final evaluation.

## Classroom model
- Whole-class majority voting; presenter records the winning option.
- 12 decisions accumulate into one project state.
- Scope, budget, schedule, stakeholder support and risk change after decisions.
- The Project Charter is progressively assembled and revealed near the end.
- Final result is ON TRACK / AT RISK / REWORK REQUIRED based on accumulated conditions, not right/wrong answers.

## Font
The CSS references Glacial Indifference font files in `assets/`. If the font files are not present, the simulator falls back to Arial. Add the licensed font files locally if desired.


## V1.1 fix
Fixed the final-vote transition so recording the last majority always completes the decision, reveals the final evaluation, and prevents a stale selection from being reused.
