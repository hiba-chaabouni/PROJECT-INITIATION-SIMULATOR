# Barista Mourouj — Project Initiation Simulator

> **What if a project had to survive a classroom vote before it could even begin?**

Barista Mourouj is an interactive classroom simulator that turns **project initiation** into a live decision-making experience.

The class is responsible for initiating a fictional project: opening a new coffee shop branch in Mourouj, Tunisia. One decision at a time, students choose the sponsor, project manager, project structure, business-case direction, stakeholder strategy, scope, constraint priority, approach and kick-off decisions.

Each decision changes the project's conditions — affecting **scope, estimated cost, schedule, stakeholder support and risk**.

The objective is not to find a single "correct" answer. It is to experience how initiation decisions create **consequences, dependencies and trade-offs**.

## Purpose

This simulator accompanies Chapter 3 — **"Initiating Projects"** — of Kathy Schwalbe's *An Introduction to Project Management, Third Edition*.

It translates the chapter into a practical classroom scenario covering:

- Pre-initiation
- Business case development
- Stakeholder identification and management
- Project scope and trade-offs
- Project approach
- Project charter development
- Kick-off meeting
- Final project evaluation

## Classroom flow

1. **Teach** the relevant Chapter 3 concept.
2. **Present** the current project situation.
3. **Vote** as a class.
4. **Record the majority** choice.
5. **Reveal the consequence.**
6. **Update the project state and documents.**
7. Continue with the next decision.

The simulator is presenter-controlled rather than an individual student quiz.

## Project Charter

The final charter is deliberately structured like a compact professional project document rather than a quiz summary.

It includes:

- Project identity, sponsor and Project Manager
- Authorization date, start date and calculated completion
- Estimated cost and budget ceiling
- Problem/opportunity and business need
- Business-case direction and objectives
- Success criteria and measurable targets
- Mandatory and selected deliverables
- Within-scope and outside-scope definitions
- Approach, stakeholder needs, assumptions and constraints
- Tentative project milestones
- Top three project risks
- Roles and responsibilities
- Comments and automated warnings
- Formal authorization and signature blocks

A **Print / Save Charter** action is also available after the charter is generated.

## Scenario assumptions

The Mourouj branch project is fictional. Barista's Cafe is a real Tunisian coffee chain, but this simulator is independent and non-commercial and is not affiliated with, authorized by, sponsored by or endorsed by Barista's Cafe, its management or franchisees.

The branch, budget, dates, stakeholder conditions, risks, success thresholds, financial figures and simulation effects are **classroom simulation assumptions**. They do not describe Barista's actual plans, finances or operations.

No proprietary or confidential Barista material is used.

## Decision model

The simulator intentionally avoids right/wrong scoring.

Examples of trade-offs include:

- More scope → higher estimated cost and longer execution
- Protecting the opening date → potential acceleration cost or scope pressure
- Protecting the budget → possible scope reduction or schedule pressure
- Internal-led execution → stronger simulated brand-quality outcome but slower capacity
- Outsourced fit-out → faster capacity but higher simulated contractor/quality risk
- Broad stakeholder engagement → higher simulated support and lower permit/community risk

All numerical effects are fictional simulation mechanics.

## Project outputs

The simulator progressively produces:

- Business Case
- Stakeholder Register
- Stakeholder Management Strategy
- Project Charter
- Kick-off Meeting structure and action items
- Risk information
- Decision Log
- Final evaluation

## Visual identity

The interface uses the project's established visual language:

- Glacial Indifference typeface
- Primary blue `#3e7fd5`
- Background `#f3f6fb`
- Black and white
- Soft shadows
- No gradients

The repository references Glacial Indifference through the CSS font-face declarations. If redistributing the font files, verify that the font license permits redistribution.

## Running the simulator

No build system is required.

1. Download or clone the repository.
2. Open `index.html` in a modern browser.
3. Run the simulator from the presenter computer.

## Project structure

```text
barista_mourouj_simulator_v1/
├── index.html
├── README.md
├── LICENSE
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── docs/
    ├── CHARTER_SPECIFICATION.md
    └── QUESTIONNAIRE_CHANGELOG.md
```

## Sources

- Kathy Schwalbe, *An Introduction to Project Management*, Third Edition, Chapter 3 — **Initiating Projects**.
- Publicly available background sources used for scenario context, paraphrased.
- All fictional project figures and simulation coefficients are classroom assumptions.

## Status

**Interactive classroom prototype — Version 1.3**

The specification and simulator are designed to be refined as the classroom presentation is tested.

## License

The code is released under the MIT License. See `LICENSE`.

The fictional scenario content and simulation assumptions are provided for educational use only.
