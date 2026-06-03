#!/bin/zsh

set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$SCRIPT_DIR/.local-test-server.pid"

cd "$SCRIPT_DIR" || exit 1

if [[ ! -f "$PID_FILE" ]]; then
    echo "Es wurde kein laufender lokaler Testserver gefunden."
    read -k 1 "reply?Taste drücken zum Schließen..."
    echo
    exit 0
fi

SERVER_PID="$(cat "$PID_FILE")"

if kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID"
    echo "Lokaler Testserver wurde gestoppt."
else
    echo "Der gespeicherte Serverprozess läuft nicht mehr."
fi

rm -f "$PID_FILE"

echo
read -k 1 "reply?Taste drücken zum Schließen..."
echo
