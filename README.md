# DSA Cram

Study tool for the DSA end-sem: 509 cards built from the five unit notes in `../New_reference`, with diagrams where they help.

## Start
Double-click `start.command`, or run `node server.mjs` here and open http://localhost:5180.
(Opening `index.html` directly also works, but without AI grading and the Doubt Room.)
AI features use your Claude Code login (`claude` CLI), so no API key is needed.

## Keys
| Where | Key | Does |
|---|---|---|
| Learn | just start typing | typing board over the card (Enter closes it, Shift+Enter new line, Ctrl/⌘+B hides the card fully, Esc closes) |
| Learn | Tab | switch this card between Learn and Test |
| Learn | ← → | previous / next card |
| Learn | Alt+C | cloze: cover the keywords (click a cover to peek) |
| Learn | Alt+S | star the card |
| anywhere | Alt+D | Doubt Room (AI tutor that knows the current card and can search the web) |
| anywhere | Ctrl/⌘+K | search all cards |
| anywhere | Alt+F | focus mode: fullscreen, no sidebar, bigger card (Esc leaves it) |
| anywhere | Alt+L / Alt+P | light/dark theme / sepia tint (also in the bottom-left dock) |
| Doubt Room | New chat | erase the conversation and start fresh |
| Test tab / test session | Ctrl/⌘+Enter | grade your answer (AI grades meaning, not wording) |

Progress lives in the browser's localStorage. Reset it per topic (↺), per unit, or everything from the home page or the sidebar.
