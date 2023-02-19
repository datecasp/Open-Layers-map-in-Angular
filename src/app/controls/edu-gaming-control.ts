import { Control } from 'ol/control';

export class EduGamingControl extends Control {
  imgMenuIcon: string = './assets/rubik.png';
  imgMenuIconHover: string = './assets/rubik-hover.png';
  imgSrc: string = this.imgMenuIcon;

  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};
    const button = document.createElement('button');
    button.innerHTML =
      '<img [src]="imgSrc" width="60dp" (mouseover)="imgSrc = this.imgMenuIconHover" (mouseout)="imgSrc = this.imgMenuIcon"/>';

    const element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleRotateNorth.bind(this), false);
  }

  handleRotateNorth() {
    //this.getMap().getView().setRotation(0);
    console.log('HOME clicked');
  }
}
