export function pinElement(element: HTMLElement) {
  // create elements
  const container = document.createElement('div');
  const clone = element.cloneNode(true) as HTMLElement;

  // style container
  container.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 200000;
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    padding: 0 10px 10px 10px;
  `;

  // style clone
  clone.style.margin = '0';

  // add elements to container
  container.appendChild(clone);

  // finally add container to the document
  document.body.prepend(container);
}
