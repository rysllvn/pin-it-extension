import { createPinnedElement } from './pin';

console.log('hello from content.ts');

// environment variables
let firstRun = true;
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
};

// add document event listeners
function registerEventListeners() {
  document.body.addEventListener('mousemove', handleMouseMove);
  document.body.addEventListener('click', handleClick, { capture: true, once: true });
}

if (firstRun) {
  firstRun = false;
  registerEventListeners();
  browser.runtime.onMessage.addListener((message: string) => {
    if (message === 'select') {
      registerEventListeners()
    } else if (message === 'cancel') {
      resetStyles(currentStyledElement);
      document.body.removeEventListener('mouseout', handleMouseOut);
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('click', handleClick);
    }
  })
}


