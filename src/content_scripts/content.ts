import { PinnedElement } from './pin';

let savedBorderStyle = 'unset';
let savedCursorStyle = 'unset';

const handleMouseMove = (event: MouseEvent) => {
  if (savedBorderStyle !== 'unset') return;

  const target = event.target as HTMLElement;
  savedBorderStyle = getComputedStyle(target).border;
  savedCursorStyle = getComputedStyle(target).cursor;
  target.style.border = '2px solid red';
  target.style.cursor = 'crosshair';

  target.addEventListener('mouseout', (event) => {
    const target = event.target as HTMLElement;
    target.style.border = savedBorderStyle;
    target.style.cursor = savedCursorStyle;
    savedBorderStyle = 'unset';
  });
};

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const element = event.target as HTMLElement;
  element.style.border = savedBorderStyle;
  const pinned = new PinnedElement(element);

  document.body.removeEventListener('mousemove', handleMouseMove);
};


document.body.addEventListener('mousemove', handleMouseMove);
document.body.addEventListener('click', handleClick, { capture: true, once: true });
