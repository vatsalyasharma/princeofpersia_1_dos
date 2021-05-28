# Prince of Persia (JS)

Prince of Persia reimplementation written in HTML5 / JavaScript

## Play Online

- Browser: https://oklemenz.github.io/PrinceJS
- Keyboard / Mouse Controls

## Play Mobile

- Browser: https://oklemenz.github.io/PrinceJS
  - Use Landscape Mode (single Browser Tab)
  - Force Fullscreen: https://oklemenz.github.io/PrinceJS?fullscreen=true
- Add to Home Screen to start as Fullscreen App
- Reduced difficulty (50%):
  - https://oklemenz.github.io/PrinceJS?strength=50&fullscreen=true
- Touch Controls (tap/drag area on screen):

  ![Mobile](assets/web/mobile.svg)

  - Dragging can be used to trigger continuous move sequences, e.g.
    - _Run Jump_: Tap Left / Right -> Hold -> Drag in Left / Right corner
    - _Jump Grab_: (Run) Jump -> Hold -> Drag to Center (Shift)

## Play Locally

- Install [Node.js](https://nodejs.org)
- Terminal:
  - `npm install`
  - `npm start`
- Browser: `localhost:8080`

## Options

Url parameters are leveraged to save game state automatically

- `level`: Current Level (1-14, default: 1)
- `health`: Max Health (3-10, default: 3)
- `time`: Remaining Minutes (1-60, default: 60)
- `strength`: Guard Strength in "%" (0-100, default: 100)
- `width`: Game Width in "px" (default: 0 (fit to screen))
- `fullscreen`: Fullscreen mode (=100vh) (default: false)

Default url looks as follows:

https://oklemenz.github.io/PrinceJS?level=1&health=3&time=60&strength=100&width=0&fullscreen=false

Manual adjustments of url parameters is possible as preset options.

## Custom Levels

Apoplexy (https://www.apoplexy.org) can be used to build custom levels.
Custom levels can be played performing the following steps.

### Single Conversion

- Save level as XML file in Apoplexy, e.g. `./xml/level1.xml`
- Call convert script, e.g. `npm run convert .../xml/level1.xml`
  - A JSON file is placed at `/assets/maps/`, e.g. `/assets/maps/level101.json`
- Custom level ids starts beyond 100, e.g. `level1.xml` gets id `101`, etc.
  - An optional second parameter can be used to control level offset
  - e.g. `npm run convert .../xml/level1.xml 200` generates `/assets/maps/level201.json`
- Start game locally with `npm start` and open game in browser
- Change Url and set parameter `level` to the respective id, e.g. `level=101`
- Note: No special events are supported

### Batch Conversion

- Place level files into folder `/converter/<xxx>`, where `<xxx>` stands for the offset (default: 100)
  - e.g. `/converter/100`: place all levels starting with 100 offset
- Execute `npm run convert`
- Corresponding JSON files are placed at `/assets/maps/`

### Level IDs

- [100](https://oklemenz.github.io/PrinceJS?level=100): Tower of Revenge
- [101-114](<(https://oklemenz.github.io/PrinceJS?level=100)>): [Prince of Persia Revisited](https://www.popot.org/custom_levels.php?mod=0000163)
