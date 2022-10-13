import { cloneElement } from 'react';
import { ADD_PIN } from '../utility/constants';

console.log('hello from content.ts');

let savedBorderStyle = 'unset';

browser.runtime.onMessage.addListener((message) => {
  console.clear();
  console.log(message);
  switch (message) {
    case ADD_PIN:
      document.body.addEventListener('mousemove', (event) => {
        if (savedBorderStyle !== 'unset') return;

        const target = event.target as HTMLElement;
        savedBorderStyle = getComputedStyle(target).border;
        target.style.border = '2px solid red';

        target.addEventListener('click', (event) => {
          const element = event.target as HTMLElement;
          const container = document.createElement('div');
          container.appendChild(element.cloneNode(true));
          document.body.prepend(container);
          container.style.backgroundColor = 'white';
          container.style.position = 'fixed';
          container.style.zIndex = '200000';
          container.style.top = '0';
        });
        target.addEventListener('mouseout', (event) => {
          const target = event.target as HTMLElement;
          target.style.border = savedBorderStyle;
          savedBorderStyle = 'unset';
        });
      });
      break;
    default:
      throw new Error('unknown  message');
  }
});
