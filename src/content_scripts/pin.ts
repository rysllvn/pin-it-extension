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
    background-color: white;
    border-radius: 4px;
    border: 1px solid black;
    resize: both;
    overflow: hidden;
    box-shadow: 2px 2px 1px 1px gray;
    padding: 4px;
  `;

  // style clone
  clone.style.margin = '0';
  clone.style.overflowY = 'auto';
  const { color, backgroundColor, fontSize } = getComputedStyle(element)
  Object.assign(clone.style, { color, backgroundColor, fontSize });

  // add controls
  const controlsDiv = document.createElement('div');
  controlsDiv.style.cssText = `
    display: flex;
    border-radius: 4px;
    background-color: white;
  `;

  const removeButton = document.createElement('removeButton');
  removeButton.textContent = 'X';
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
    border: 1px solid black;
    cursor: grab;
    width: 100%;
  `;
  dragBar.textContent = 'dragbar';
  dragBar.addEventListener('mousedown', handleMouseDown);

  controlsDiv.appendChild(dragBar);
  controlsDiv.appendChild(removeButton);

  container.addEventListener('mouseenter', () => {
    controlsDiv.style.visibility = 'visible';
  });
  container.addEventListener('mouseleave', () => {
    controlsDiv.style.visibility = 'hidden';
  });


  // add elements to container
  container.appendChild(controlsDiv);
  container.appendChild(clone);

  // finally add container to the document
  document.body.prepend(container);
}
