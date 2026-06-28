#!/bin/sh
# -d /tmp sends the .class files to writable /tmp (NOT read-only /sandbox)
if ! javac -d /tmp /sandbox/Main.java; then
  exit 2
fi

# run from /tmp where the .class landed
exec java -cp /tmp Main
