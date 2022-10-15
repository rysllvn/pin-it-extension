import { pinElement } from './pin';
let savedBorderStyle = 'unset';
let savedCursorStyle = 'unset';

function resetStyles(element: HTMLElement) {
  element.style.border = savedBorderStyle;
  element.style.cursor = savedCursorStyle;
  savedBorderStyle = 'unset';
}

function handleMouseMove(event: MouseEvent) {
  if (savedBorderStyle !== 'unset') return;

  const target = event.target as HTMLElement;
  savedBorderStyle = getComputedStyle(target).border;
  savedCursorStyle = getComputedStyle(target).cursor;
  target.style.border = '2px solid red';
  target.style.cursor = 'crosshair';

  target.addEventListener('mouseout', (event) => {
    const target = event.target as HTMLElement;
    resetStyles(target)
  });
}

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const target = event.target as HTMLElement;

  resetStyles(target);
  pinElement(target);

  document.body.removeEventListener('mousemove', handleMouseMove);
};




document.body.addEventListener('mousemove', handleMouseMove);
document.body.addEventListener('click', handleClick, { capture: true, once: true });
