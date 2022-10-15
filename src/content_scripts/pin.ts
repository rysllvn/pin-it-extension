export class PinManager {
  private pins: PinnedElement[];
  constructor() {
    this.pins = [];
  }
}

export class PinnedElement {
  private container: HTMLElement;

  constructor(element: HTMLElement) {
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
    this.container = container;
  }

  private removeSelf() {
    this.container.remove();
  }

  public resize(width: number, height: number) {
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }
}
