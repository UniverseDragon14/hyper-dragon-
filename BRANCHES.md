# Hyper Dragon Branch Map

Inspected on **2026-09-01**. All **5 reachable branches** are accounted for. The implementation tips were recorded before documentation-only audit commits.

| Branch | Inspected implementation tip | Purpose / state |
|---|---|---|
| `agent/kimi-k3-cloudflare` | `30ba4e574191` | Large initial snapshot with QBIT/NOVA docs, runtime history, dashboard and Kimi/Cloudflare setup |
| `feat/kimi-k3-nova-brain` | `c0e81eadf198` | Kimi brain deployment guide |
| `feat/universal-dragon-eve-nova-brain` | `1ab4b7f0cf48` | EVE/NOVA identity alignment |
| `feat/universal-dragon-eve-nova-core` | `04b36f3c360a` | Release-bundle test identity alignment |
| `nova-v1.4.0-dev` | `569e70d957ef` | Current documented mirror/snapshot boundary |

## Boundary

This repository is a Universal Dragon Core mirror/snapshot plus Kimi/EVE/NOVA setup work. No inspected branch establishes a separate hyper-computing engine or physical QPU. The large initial branch also includes generated/binary artifacts that should be reviewed before merging.
