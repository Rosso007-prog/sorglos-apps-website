#!/bin/zsh

set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=8000
PID_FILE="$SCRIPT_DIR/.local-test-server.pid"
LOG_FILE="$SCRIPT_DIR/.local-test-server.log"

cd "$SCRIPT_DIR" || exit 1

if [[ -f "$PID_FILE" ]]; then
    EXISTING_PID="$(cat "$PID_FILE")"
    if kill -0 "$EXISTING_PID" >/dev/null 2>&1; then
        echo "Lokaler Testserver läuft bereits auf http://localhost:$PORT"
        open "http://localhost:$PORT"
        echo
        echo "Wenn du ihn stoppen willst, klicke auf StopLokalTesten.command"
        read -k 1 "reply?Taste drücken zum Schließen..."
        echo
        exit 0
    fi
    rm -f "$PID_FILE"
fi

echo "Starte lokalen Testserver für GitHub-Website ..."

python3 -m http.server "$PORT" >"$LOG_FILE" 2>&1 &
SERVER_PID=$!
echo "$SERVER_PID" >"$PID_FILE"

sleep 2

if kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    echo "Server erfolgreich gestartet:"
    echo "  URL:  http://localhost:$PORT"
    echo "  Log:  $LOG_FILE"
    echo "  PID:  $SERVER_PID"
    echo
    echo "Die Seite wird jetzt im Browser geöffnet."
    open "http://localhost:$PORT"
    echo
    echo "Zum Beenden einfach StopLokalTesten.command anklicken."
else
    echo "Der Server konnte nicht gestartet werden."
    echo "Prüfe, ob Python 3 installiert ist oder ob Port $PORT bereits belegt ist."
    rm -f "$PID_FILE"
fi

echo
read -k 1 "reply?Taste drücken zum Schließen..."
echo
