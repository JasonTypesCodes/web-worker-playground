import { Drawable } from './Drawable';
import 'fabric/dist/fabric';

export class Ball implements Drawable {
  public circle:fabric.ICircle;

  constructor(
    private color:string='red',
    private radius:number=40,
    private xVelocity:number=0.2,
    private yVelocity:number=0.2
  ) {
    this.circle = new fabric.Circle({fill: color, radius: radius});
  }

  getFabricObject() : fabric.ICircle {
    return this.circle;
  }

  draw(time:number, docWidth:number, docHeight:number) {
    let diameter:number = this.circle.radius * 2;
    let width:number = docWidth - diameter;
    let height:number = docHeight - diameter;
    let xPos:number = (time * this.xVelocity) % width;
    let yPos:number = (time * this.yVelocity) % height;

    if((((time * this.xVelocity) / width) % 2) >= 1) {
      xPos = width - xPos;
    }
    if((((time * this.yVelocity) / height) % 2) >= 1) {
      yPos = height - yPos;
    }

    this.circle.set('left', xPos);
    this.circle.set('top', yPos);
  }
}
