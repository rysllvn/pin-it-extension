# Pin It Browser Extension

[Informational Page](https://rysllvn.github.io/pin-it-info-page/)

## Contents

- [Pin It Browser Extension](#pin-it-browser-extension)
  - [Contents](#contents)
  - [Goal](#goal)
  - [What it does](#what-it-does)
    - [Browser action](#browser-action)
    - [Selection mode](#selection-mode)
    - [Containers](#containers)
      - [Containers can be resized, dragged, and removed.](#containers-can-be-resized-dragged-and-removed)
  - [What it doesn't do](#what-it-doesnt-do)
  - [Planned functionality additions](#planned-functionality-additions)
  - [Building](#building)
  - [Contact](#contact)
  - [Credits](#credits)
## Goal

Pin it is designed to be a very light weight extension for "pinning" elements to the page.
## What it does

### Browser action

Clicking the icon toggles selection mode.

### Selection mode

When in this mode, elements that are hovered are highlighted in red. Clicking an element selects it

After selecting an element a deep clone (element and all its children) of the element is created . This clone is put into a container div.

### Containers 

Containers are removed from the regular flow of the document with the `position: static` css property.
#### Containers can be resized, dragged, and removed.

- The container element is resizeable via the css `resizable: both` property and draggable.
- Dragging is accomplished with event listeners and corresponsding handlers for `mousedown`, `mousemove`, and `mouseup`.
- There is also a button to remove the container from the DOM.

## What it doesn't do

- The style of elements is often highly dependent on the context it is in (it's parent elements). For this reason removing an element from the normal flow often results in it not appearing as it normally did. This extension does not make much of an attempt to preserve styling. It copies the `color`, `background-color`, and `font-size` so that at least some of the styling persists. This is not done for any of the children though.
- `cloneNode(true)` has no effect on void elements such as `img` and `input` elements [cloneNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)

## Planned functionality additions
 - more indicators you are in selection mode (maybe opaque overlay, but how would we reach elements underneath?)
 - dark theming
 - attempt to preserve styles better
 - save text that was pinned
 - option to delete the selected element so that only the clone is on the page

## Building

- from root `npm i`
- then `npm run build`
- then `cd dist`
- then `web-ext build`

## Contact

Using Github is great or email me.

## Credits

Icon by <a href="https://freeicons.io/profile/3277">Gayrat Muminov</a> on <a href="https://freeicons.io">freeicons.io</a>.

I changed the color to orange red (#ff4500) from periwinkle gray (#d3d4ed)
                                

