# Optional game sounds

The game currently uses these supplied files:

- `pickup.mp3`: piece selection, new piece set and UI feedback
- `place.mp3`: one layer per block placed
- `drop.mp3`: invalid placement
- `clear.mp3`: one or multiple lines cleared
- `combo-1x.wav` through `combo-8x.wav`: combo cues, one for each combo level
- `newbest.mp3`: the complete new-best cue, played as a single file

New-piece and UI feedback reuse `pickup.mp3`; multi-line clears reuse
`clear.mp3`. Game-over, new-game and combo-break sounds stay silent until a
file is supplied and mapped under `SOUND_FILES` in `index.html`.

Place sounds are layered once per block: the first is at 100%, then 50%, 25%,
12.5% and so on. Each next layer rises by two semitones. The Volume setting
scales all layers. Formats and per-event trim offsets are centralized in
`index.html`; MP3, WAV and OGG are supported. Missing optional events remain
silent without interrupting gameplay.