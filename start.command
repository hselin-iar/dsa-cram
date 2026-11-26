#!/bin/zsh
# Double-click to start DSA Cram: runs the local helper (AI grading + Doubt Room) and opens the app.
cd "$(dirname "$0")"
if ! curl -s -m 1 http://localhost:5180/api/health >/dev/null; then
  node server.mjs &
  sleep 1
fi
open http://localhost:5180
wait
