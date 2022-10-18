import { createPinnedElement } from './pin';

// environment variables
let waiting = true;

type SavedStyle = {
  border: string;
  cursor: string;
  boxShadow: string;
};
let savedStyle: 'unset' | SavedStyle = 'unset';
let currentStyledElement: HTMLElement;

// helper functions
function resetStyles(element: HTMLElement) {
  if (savedStyle === 'unset') return;
  Object.assign(element.style, savedStyle);
  savedStyle = 'unset';
}

// event handlers
function handleMouseOut(event: MouseEvent) {
  const target = event.target as HTMLElement;
  currentStyledElement = target;
  resetStyles(target)
}

function handleMouseMove(event: MouseEvent) {
  if (savedStyle !== 'unset') return;

  const target = event.target as HTMLElement;
  const { border, cursor, boxShadow } = getComputedStyle(target);
  savedStyle = { border, cursor, boxShadow };
  Object.assign(target.style, {
    border: '1px solid black',
    boxShadow: '5px 5px 5px black',
    cursor: 'crosshair',
  });

  target.addEventListener('mouseout', handleMouseOut);
}

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const target = event.target as HTMLElement;

  resetStyles(target);
  createPinnedElement(target);

  document.body.removeEventListener('mousemove', handleMouseMove);
  waiting = true;
};

// add document event listeners
const clickOptions = { capture: true, once: true };
function registerEventListeners() {
  waiting = false;
  document.body.addEventListener('mousemove', handleMouseMove);
  document.body.addEventListener('click', handleClick, clickOptions);
}

// handle messages
browser.runtime.onMessage.addListener((message: string) => {
  if (message !== 'toggle') return;

  if (waiting) return registerEventListeners();

  waiting = true;
  resetStyles(currentStyledElement);
  document.body.removeEventListener('mouseout', handleMouseOut);
  document.body.removeEventListener('mousemove', handleMouseMove);
  document.body.removeEventListener('click', handleClick, clickOptions);
});
