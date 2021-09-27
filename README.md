# Prince of Persia (JS)

Prince of Persia reimplementation written in HTML5 / JavaScript

## Play Online

- Browser: https://princejs.com
- Keyboard / Mouse Controls

## Play Mobile

- Browser: https://princejs.com
  - Use Landscape Mode (Single Tab, Disable Landscape Tab Bar in Browser Settings)
  - Force Fullscreen: https://princejs.com?fullscreen=true
- Add to Home Screen to start as Fullscreen App
- Reduced difficulty (50%):
  - https://princejs.com?strength=50&fullscreen=true
- Touch Controls (tap/drag area on screen):

  ![Mobile](assets/web/mobile.svg)

  - Dragging can be used to trigger continuous move sequences, e.g.
    - _Run Jump_: Tap Left / Right -> Hold -> Drag in Left / Right corner
    - _Jump Grab_: (Run) Jump -> Hold -> Drag to Center (Shift)

## Play GitHub Version

- Browser: https://oklemenz.github.io/PrinceJS

## Play Locally

- Install [Node.js](https://nodejs.org)
- Clone: `https://github.com/oklemenz/PrinceJS.git`
- Terminal:
  - `npm install`
  - `npm start`
- Browser: `localhost:8080`

## Options

Url parameters are leveraged to save game state automatically (shortcut in brackets)

- `level (l)`: Current Level (1-14, default: 1)
- `health (h)`: Max Health (3-10, default: 3)
- `time (t)`: Remaining Minutes (1-60, default: 60)
- `strength (s)`: Guard Strength in "%" (0-100, default: 100)
- `width (w)`: Game Width in "px" (default: 0 (fit to screen))
- `fullscreen (f)`: Fullscreen mode (=100vh) (default: false)
- `shortcut (_)`: Write url in shortcut version (default: false)

Default url looks as follows:

https://princejs.com?level=1&health=3&time=60&strength=100&width=0&fullscreen=false

Default shortcut url looks as follows:

https://princejs.com?l=1&h=3&t=60&s=100&w=0&f=false&_=true

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

Converted levels from https://www.popot.org/custom_levels.php:

- [100](https://princejs.com?level=100): Tower of Revenge (own)
- [101-114](https://princejs.com?level=101): [Prince of Persia Revisited](https://www.popot.org/custom_levels.php?mod=0000163)
- [115-128](https://princejs.com?level=115): [Jaffar's House](https://www.popot.org/custom_levels.php?mod=0000220)
- [129-142](https://princejs.com?level=129): [Ipank's Levels](https://www.popot.org/custom_levels.php?mod=0000151)
- [143-156](https://princejs.com?level=143): [Barre's Alternative](https://www.popot.org/custom_levels.php?mod=0000189)
- [157-170](https://princejs.com?level=157): [Miracles Don't Exist](https://www.popot.org/custom_levels.php?mod=0000098)
- [171-184](https://princejs.com?level=171): [Babylon Tower Climb](https://www.popot.org/custom_levels.php?mod=0000109)
- [185-198](https://princejs.com?level=185): [Lost in Errors](https://www.popot.org/custom_levels.php?mod=0000144)
- [199-212](https://princejs.com?level=199): [Story Retold](https://www.popot.org/custom_levels.php?mod=0000146)
- [213-226](https://princejs.com?level=213): [Prince of Persia Guard Revolt](https://www.popot.org/custom_levels.php?mod=0000162)
- [227-240](https://princejs.com?level=227): [Return of Prince](https://www.popot.org/custom_levels.php?mod=0000207)
