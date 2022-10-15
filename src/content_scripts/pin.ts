let container: HTMLElement;
let clone: HTMLElement;

export function pinElement(element: HTMLElement) {
  // create elements
  container = document.createElement('div');
  clone = element.cloneNode(true) as HTMLElement;
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
    justify-content: center;
    align-items: center; 
  `;

  // style clone
  clone.style.margin = '0';
  const { width, height, color, backgroundColor, fontSize } = getComputedStyle(element)
  Object.assign(clone.style, { width, height, color, backgroundColor, fontSize });

  // add controls
  const controlsDiv = document.createElement('div');

  const removeButton = document.createElement('removeButton');
  removeButton.textContent = 'remove';
  removeButton.onclick = () => {
    container.remove();
  };

  const dragBar = document.createElement('div');
  dragBar.style.width = '100%';
  dragBar.style.height = '10px';
  dragBar.style.backgroundColor = 'black';
  dragBar.addEventListener('mousedown', handleMouseDown);

  controlsDiv.appendChild(dragBar);
  controlsDiv.appendChild(removeButton);

  container.addEventListener('mouseenter', () => {
    controlsDiv.style.display = 'block';
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

function handleMouseDown() {
  
}

function handleMouseMove(event: MouseEvent) {
  console.log(event);
}
