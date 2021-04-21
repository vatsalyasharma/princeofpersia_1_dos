# Prince of Persia (JS)

Prince of Persia reimplementation written in HTML5 / JavaScript

## Play Online

- Browser: https://oklemenz.github.io/PrinceJS
- Keyboard / Mouse Controls

## Play Mobile

- Browser: https://oklemenz.github.io/PrinceJS
- Use Landscape Mode (single browser tab)
  - Force Fullscreen: https://oklemenz.github.io/PrinceJS?fullscreen=true
- Add to Home Screen to start as Fullscreen App
- Touch Controls:

  ![Mobile](assets/web/mobile.svg)

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
- `strength`: Guard Strength in "%" (1-100, default: 100)
- `width`: Game Width in "px" (default: 0 (fit to screen))
- `fullscreen`: Fullscreen mode (=100vh) (default: false)

Default url looks as follows:

https://oklemenz.github.io/PrinceJS?level=1&health=3&time=60&strength=100&width=0&fullscreen=false

Manual adjustments of url parameters is possible as preset options.
