// contains logic to remove self from the document
export function createPinnedElement(element: HTMLElement) {
  // create elements
  const containerDiv = document.createElement('div');
  containerDiv.className = 'pin-it-container';

  const clone = element.cloneNode(true) as HTMLElement;

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'controls';

  const dragDiv = document.createElement('div');
  dragDiv.className = 'drag';

  const removeButton = document.createElement('div');
  removeButton.innerHTML = '&times;'
  removeButton.className = 'remove-button';

  // position container
  const clientRect = element.getBoundingClientRect();
  containerDiv.style.top = `${clientRect.top}px`;
  containerDiv.style.left = `${clientRect.left}px`;


  // Possible improvements for clone styling listed below:
  // 1. try and preserve some clone styling and of the children that is dependent on
  //    the location in the DOM
  // 2. traverse all children and do the same
  // 3. absolutely positioned children are sometimes an issue.
  //    maybe check boundingClientRect to see if any elements are above the clone.
  //    This is the main issue if they use position absolute with top: -10px for example
  Object.assign(clone.style, {
    position: 'relative',
    top: '0',
    left: '0',
    margin: '0',
  });

  // variables to help with drag computations;
  let initialX: number;
  let initialY: number;
  let left: number;
  let top: number;

  // event handlers for dragging
  function handleMouseDown(event: MouseEvent) {
    initialX = event.x;
    initialY = event.y;
    left = containerDiv.getBoundingClientRect().left;
    top = containerDiv.getBoundingClientRect().top;
    const containerRect = containerDiv.getBoundingClientRect();
    containerDiv.style.width = `${Math.ceil(containerRect.width)}px`;
    containerDiv.style.height = `${Math.ceil(containerRect.height)}px`;
    document.body.addEventListener('mousemove', handleMouseMove);
  }
  
  function handleMouseMove(event: MouseEvent) {
    const dx = event.x - initialX;
    const dy = event.y - initialY;

    containerDiv.style.left = `${left + dx}px`;
    containerDiv.style.top = `${top + dy}px`;

    dragDiv.addEventListener('mouseup', handleMouseUp, { once: true });
  }

  function handleMouseUp() {
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
