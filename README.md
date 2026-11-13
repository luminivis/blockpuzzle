# Block Puzzle

## About

I vibe coded this little block game with AI. I wanted something simple to pick
up for a few minutes. There is no timer, no sign up, and no complicated stuff.
It is a work in progress, so there may still be a few rough edges.

## How to play

Pick a piece and put it on the 8 by 8 board. Fill a whole row or column to clear
it. You get three pieces at a time, including lines, corners, 3 by 3 blocks,
diagonals, and other shapes.

Tap a piece, then tap a spot to place it. You can also drag a piece onto the
board on a touchscreen or with a mouse. On a touchscreen the piece floats above
your finger so your hand does not cover it. For keyboard play, press 1, 2 or 3
(or use Tab) to choose a piece, the arrow keys to pick a spot, and Enter to
place it. Escape puts a piece back. Sound is enabled by default; browsers start
playing it after your first interaction. Open Settings (gear button) to set
your colors, sound and volume, tune dragging, or read the code, privacy and
license information. On a wide screen the board sits to the left and the main
controls are grouped at the right. The full-screen button fills the display
where the browser supports it.

## Scores

Your score, cleared lines, combo and pieces are saved in your browser after a
move, so you can continue after refreshing or reopening the page. Your best is
also saved separately and is not shared. It is just for fun, not a competitive
leaderboard.

## Offline

There are no outside images or other online assets. If you open `index.html`
directly, it works offline. For the hosted website, visit once while online so
your browser can save the game. Then you can play without a connection. The
hosted game checks for updates online and replaces its offline copy when a new
version is published. The privacy page is saved for offline use too.

## Privacy

The game stores your current board, score, pieces, best score and settings
(colors, sound, volume, drag and animation options) in your browser. It does not
use analytics, ads, or tracking. Read the [privacy
policy](./privacy/) for details.

## Sound files

Optional sound assets go in `audio/`. MP3, WAV and OGG filenames and combo
trim points are listed in `audio/README.md`. The game remains playable when an
asset is missing; it does not generate sound effects.

## License

This project is dedicated to the public domain under [CC0 1.0](./LICENSE).

Combo: clear lines on back-to-back moves to build a streak. Each extra step adds more
bonus (50, 150, 300, 500 and so on). You can miss up to three moves without a
clear; the dots on the combo badge show how many you have left, and the fourth
miss ends it.
