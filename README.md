# NXT-6 · Smart AC Control

A responsive, dark glassmorphism air-conditioner control panel built with plain HTML, CSS and JavaScript.

## Files

- `index.html` — semantic widget structure and controls
- `styles.css` — responsive glass UI, states and motion
- `script.js` — temperature, power, mode, fan speed and live status logic

## Run locally

1. Download or clone this repository.
2. Keep all three files in the same folder (the repository root in this starter).
3. Open `index.html` in a browser, or use VS Code with the Live Server extension.
4. No build step, framework, package install or API key is required.

## Add to an existing NXT-6 page

Move the AC card markup from `index.html` (the `<section class="control-card">` element) into the target page. Keep the stylesheet link and deferred script include in the page head. If your page already has a global header or background, reuse only the card markup and merge the relevant CSS rules to avoid duplicate global styles.

## Controls

- Power toggle: ON/OFF with green/red LED and disabled control state
- Temperature: 16–30°C, starting at 24°C
- Modes: Cool, Heat, Fan, Dry and Auto
- Fan speed: Low, Med, High and Turbo
- Live status sentence updates as settings change

## Hardware note

This is a frontend interaction demo. It updates the interface only; it does not communicate with a physical air conditioner. Real device control requires a compatible AC, bridge/controller and an authorized API or local integration.