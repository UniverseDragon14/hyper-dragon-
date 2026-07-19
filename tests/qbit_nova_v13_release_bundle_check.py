#!/usr/bin/env python3
from pathlib import Path
import os
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
BUILDER = ROOT / "tools" / "build-qbit-nova-bundle.sh"


def run_cmd(cmd, cwd=None):
    result = subprocess.run(cmd, cwd=cwd or ROOT, text=True, capture_output=True)
    output = (result.stdout or "") + (result.stderr or "")
    if result.returncode != 0:
        print(output)
        raise SystemExit(result.returncode)
    return output


with tempfile.TemporaryDirectory(prefix="qbit_nova_v13_") as tmp:
    base = Path(tmp)
    bundle = base / "bundle"
    prefix = base / "prefix"

    built = run_cmd([str(BUILDER), str(bundle)])

    if "QBIT_NOVA_V13_BUNDLE_BUILT" not in built:
        print(built)
        raise SystemExit("bundle build marker missing")

    required = [
        "README.md",
        "NOVA_QBIT_VERSION",
        "tools/nova_cli.ud",
        "tools/qbit-nova",
        "tools/install-qbit-nova.sh",
        "engine/qbit_nova_v07_engine.py",
        "engine/qbit_nova_v08_tokenizer.py",
        "engine/qbit_nova_v09_token_parser.py",
        "engine/qbit_nova_v09_pipeline.py",
        "nova-lang/v2/nova2_run.py",
        "nova-lang/v2/nova2_seed.py",
        "nova-lang/v2/nova2_quantum_syntax.py",
        "examples/v2/qbit_nova_world.ud",
        "examples/v2/qbit_nova_v07_native_zero.ud",
    ]

    for relative_path in required:
        if not (bundle / relative_path).exists():
            raise SystemExit(f"bundle missing: {relative_path}")

    installer = bundle / "tools" / "install-qbit-nova.sh"
    launcher = prefix / "bin" / "qbit-nova"
    world = bundle / "examples" / "v2" / "qbit_nova_world.ud"
    source = bundle / "examples" / "v2" / "qbit_nova_v07_native_zero.ud"

    install_output = run_cmd([str(installer), "--prefix", str(prefix)], cwd=bundle)

    if "QBIT_NOVA_V12_INSTALLER_GREEN" not in install_output:
        print(install_output)
        raise SystemExit("installer marker missing")

    if not launcher.exists():
        raise SystemExit("launcher missing")

    if not os.access(launcher, os.X_OK):
        raise SystemExit("launcher not executable")

    doctor = run_cmd([str(launcher), "doctor"], cwd=bundle)
    run_world = run_cmd([str(launcher), "run", str(world)], cwd=bundle)
    intermediate_representation = run_cmd([str(launcher), "ir", str(source)], cwd=bundle)

    checks = [
        (doctor, "QBIT NOVA doctor"),
        (doctor, "Runner  : OK"),
        (run_world, "memory intelligence = EVE"),
        (run_world, "Brain: NOVA"),
        (run_world, "Universal Dragon EVE NOVA online"),
        (run_world, "guard block loaded"),
        (intermediate_representation, "QBIT_NOVA_V10_IR_GREEN"),
    ]

    for output, marker in checks:
        if marker not in output:
            print(output)
            raise SystemExit(f"missing marker: {marker}")

print("QBIT_NOVA_V13_RELEASE_BUNDLE_GREEN")
