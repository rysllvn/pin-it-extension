// styles
// maybe move to css file, but then need to be careful to namespace all elements properly
const containerStyle = `
  position: fixed;
  z-index: 200000;
  background-color: white;
  border-radius: 4px;
  border: 1px solid black;
  overflow: hidden;
  box-shadow: 2px 2px 1px 1px gray;
  padding: 4px;
  resize: both;
  box-sizing: border-box;
`;
const controlsStyle = `
  display: flex;
  background-color: white;
  border-bottom: 1px solid grey;
  margin-bottom: 8px;
`;
const removeButtonStyle = `
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;
const dragDivStyle = `
  cursor: grab;
  width: 100%;
`;

// contains logic to remove self from the document
export function createPinnedElement(element: HTMLElement) {
  // create elements
  const containerDiv = document.createElement('div');
  const controlsDiv = document.createElement('div');
  const removeButton = document.createElement('removeButton');
  const dragDiv = document.createElement('div');
  const clone = element.cloneNode(true) as HTMLElement;

  // style elements
  // style container
  const clientRect = element.getBoundingClientRect();
  containerDiv.style.cssText = containerStyle;
  containerDiv.style.top = `${clientRect.top}px`;
  containerDiv.style.left = `${clientRect.left}px`;

  // style clone - this only styles the top level node
  // traverse all children and style is a good improvement to do later
  clone.style.margin = '0';
  const { color, backgroundColor, fontSize } = getComputedStyle(element)
  Object.assign(clone.style, { color, backgroundColor, fontSize });

  // style controls
  controlsDiv.style.cssText = controlsStyle
  // style remove
  removeButton.innerHTML = '&times;';
  removeButton.style.cssText = removeButtonStyle;
  // style dragDiv
  dragDiv.style.cssText = dragDivStyle;


  // variables to help with dragging
  let x: number;
  let y: number;
  let left: number;
  let top: number;

  // event handlers for dragging
  function handleMouseDown(event: MouseEvent) {
    dragDiv.style.cursor = 'grabbing'
    x = event.x;
    y = event.y;
    left = containerDiv.getBoundingClientRect().left;
    top = containerDiv.getBoundingClientRect().top;
    const containerRect = containerDiv.getBoundingClientRect();
    containerDiv.style.width = `${Math.ceil(containerRect.width)}px`;
    containerDiv.style.height = `${Math.ceil(containerRect.height)}px`;
    console.log(containerRect);
    document.body.addEventListener('mousemove', handleMouseMove);
  }
  
  function handleMouseMove(event: MouseEvent) {
    const dx = event.x - x;
    const dy = event.y - y;

    containerDiv.style.left = `${left + dx}px`;
    containerDiv.style.top = `${top + dy}px`;

    dragDiv.addEventListener('mouseup', handleMouseUp, { once: true });
  }

  function handleMouseUp() {
    dragDiv.style.cursor = 'grab'
    document.body.removeEventListener('mousemove', handleMouseMove);
  }


  // register listeners
  dragDiv.addEventListener('mousedown', handleMouseDown);
  removeButton.onclick = () => containerDiv.remove();

  // build the container
  // first add dragDiv and removeButton to controlsDiv
  controlsDiv.appendChild(dragDiv);
  controlsDiv.appendChild(removeButton);
  // then add controls and the clone to the container
  containerDiv.appendChild(controlsDiv);
  containerDiv.appendChild(clone);

  
  // finally add containerDiv to the document
  document.body.prepend(containerDiv);
}
