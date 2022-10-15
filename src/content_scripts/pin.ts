export function pinElement(element: HTMLElement) {
  // create elements
  const container = document.createElement('div');
  const clone = element.cloneNode(true) as HTMLElement;
  const clientRect = element.getBoundingClientRect();

  // style container
  container.style.cssText = `
    position: fixed;
    top: ${clientRect.top}px;
    left: ${clientRect.left}px;
    z-index: 200000;
    background-color: ${getComputedStyle(document.body).backgroundColor};
    border: 2px solid black;
    border-radius: 4px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
  `;

  // style clone
  clone.style.margin = '0';
  const { width, height, color, backgroundColor, fontSize } = getComputedStyle(element)
  Object.assign(clone.style, { width, height, color, backgroundColor, fontSize });

  // add controls
  const controlsDiv = document.createElement('div');
  controlsDiv.style.cssText = `
    display: flex;
  `;

  const removeButton = document.createElement('removeButton');
  removeButton.textContent = 'remove';
  removeButton.onclick = () => {
    container.remove();
  };

  let x: number;
  let y: number;
  let left: number;
  let top: number;
  function handleMouseDown(event: MouseEvent) {
    document.body.style.cursor = 'grabbing'
    x = event.x;
    y = event.y;
    left = container.getBoundingClientRect().left;
    top = container.getBoundingClientRect().top;
    console.log(container.getBoundingClientRect(), x);
    document.body.addEventListener('mousemove', handleMouseMove);
  }
  
  function handleMouseMove(event: MouseEvent) {
    const dx = event.x - x;
    const dy = event.y - y;

    container.style.left = `${left + dx}px`;
    container.style.top = `${top + dy}px`;

    dragBar.addEventListener('mouseup', handleMouseUp, { once: true });
  }

  function handleMouseUp(event: MouseEvent) {
    console.log(x, event.x)
    document.body.removeEventListener('mousemove', handleMouseMove);
  }

  const dragBar = document.createElement('div');
  dragBar.style.cssText = `
    flex-grow: 1;
    border: 1px solid black;
    cursor: grab;
  `;
  dragBar.textContent = 'dragbar';
  dragBar.addEventListener('mousedown', handleMouseDown);

  controlsDiv.appendChild(dragBar);
  controlsDiv.appendChild(removeButton);

  container.addEventListener('mouseenter', () => {
    controlsDiv.style.display = 'flex';
  });
  container.addEventListener('mouseleave', () => {
    controlsDiv.style.display = 'none';
  });


  // add elements to container
  container.appendChild(controlsDiv);
  container.appendChild(clone);

  // finally add container to the document
  document.body.prepend(container);
}
