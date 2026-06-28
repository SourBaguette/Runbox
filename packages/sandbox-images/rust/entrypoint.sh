#!/bin/sh
# Compile to /tmp (writable tmpfs) - NOT /sandbox, which is mounted read-only.
# If compilation fails, exit 2 so the worker labels it compile_error.
if ! rustc -o /tmp/program /sandbox/main.rs; then
    exit 2
fi

# Replace this shell with the compiled program so its exit code
# becomes the container's exit code
exec /tmp/program