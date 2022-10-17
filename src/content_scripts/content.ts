import { createPinnedElement } from './pin';


// environment variables
let waiting = true;
let savedBorderStyle = 'unset';
let savedCursorStyle = 'unset';
let currentStyledElement: HTMLElement;

// helper functions
function resetStyles(element: HTMLElement) {
  if (savedBorderStyle === 'unset') return;
  element.style.border = savedBorderStyle;
  element.style.cursor = savedCursorStyle;
  savedBorderStyle = 'unset';
  savedCursorStyle = 'unset';
}

// event handlers
function handleMouseOut(event: MouseEvent) {
  const target = event.target as HTMLElement;
  currentStyledElement = target;
  resetStyles(target)
}

function handleMouseMove(event: MouseEvent) {
  if (savedBorderStyle !== 'unset') return;

  const target = event.target as HTMLElement;
  savedBorderStyle = getComputedStyle(target).border;
  savedCursorStyle = getComputedStyle(target).cursor;
  target.style.border = '2px solid red';
  target.style.cursor = 'crosshair';

  target.addEventListener('mouseout', handleMouseOut);
}

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const target = event.target as HTMLElement;

  resetStyles(target);
  createPinnedElement(target);

  browser.runtime.sendMessage('element selected');

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
