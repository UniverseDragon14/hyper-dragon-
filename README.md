# Universal Dragon Aslam · EVE NOVA · QBIT NOVA

<p align="center">
  <img
    src="docs/assets/qbit-nova-universal-dragon-global-system.jpg"
    alt="Universal Dragon Aslam EVE NOVA Global System"
    width="900"
  />
</p>

<p align="center">
  <strong>Universal Dragon Aslam Global System</strong><br>
  EVE Intelligence · NOVA Brain · QBIT NOVA · Virtual QCPU · Raspberry Pi 5 · Approval-First Architecture
</p>

UD means Universal Dragon.

Creator: Aslam  
Team: Askutty  
Intelligence: EVE  
Brain: NOVA  
Language: QBIT NOVA  
Source extension: `.ud`  
Version: `1.4.0-dev`

## System hierarchy

```text
Universal Dragon Aslam
├── EVE Intelligence Layer
├── NOVA Brain Core
├── QBIT NOVA Language
├── Virtual QCPU
├── Dragon Eye
└── Approval-First Guard
```

Public interfaces use only Universal Dragon, Aslam, EVE, NOVA, QBIT NOVA, UDOS, and Dragon Eye identity names.

External intelligence tokens, endpoints, model identifiers, SDKs, and runtime adapters are private implementation details. They must not appear in the browser UI, public API responses, normal logs, screenshots, or committed secrets.

## Core identity

QBIT NOVA is the top-level Universal Dragon language. The user writes `.ud` source files only.

QBIT NOVA is not publicly identified as Python, C, C++, Java, HTML, TypeScript, or as any external AI provider. Supporting technologies may exist only as internal compiler, runtime, or private-adapter targets.

## Quick test

```bash
nova doctor
nova run examples/v2/qbit_nova_world.ud
nova qbit examples/v2/qbit_test.qnova
```

## QBIT NOVA example

```ud
nova universal_dragon
creator aslam
team askutty
intelligence eve
brain nova

say "Universal Dragon EVE NOVA online"

qbit dragon = |0>
h dragon
measure dragon

guard:
  owner_approval required
  dangerous_action deny
```

<!-- NOVA_QBIT_STATUS_START -->
## NOVA QBIT test status

[![NOVA QBIT Tests](https://github.com/UniverseDragon14/Universal-Dragon-Core/actions/workflows/qbit-tests.yml/badge.svg?branch=nova-v1.4.0-dev)](https://github.com/UniverseDragon14/Universal-Dragon-Core/actions/workflows/qbit-tests.yml)

Current verified QBIT features:

- QBIT NOVA `.ud` source preprocessor
- Single qbit gates: H, X, Z
- State and probability display
- Measurement collapse
- Multi-qbit register
- CNOT gate
- Bell-style linked state
- 20-run Bell repeat stability test
- Automated CI testing on `nova-v1.4.0-dev`

Latest locked milestone:

`QBIT NOVA v1.4.0-dev has started as the Universal Dragon language branch.`

<!-- NOVA_QBIT_STATUS_END -->

## Guard contract

```text
[GUARD] owner_approval = REQUIRED
[GUARD] dangerous_action = DENY
```

Universal Dragon allows safe adapter output, simulation, validation, and owner-approval flows. It blocks raw external-adapter command execution, automatic account-changing actions, and dangerous system mutation without explicit owner approval.
