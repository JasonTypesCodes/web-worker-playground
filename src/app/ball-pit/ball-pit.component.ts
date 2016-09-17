import { Component, OnInit } from '@angular/core';
import 'fabric/dist/fabric';

@Component({
  selector: 'ball-pit',
  template: `
    <canvas id="c" width="500px" height="500px"></canvas>
  `
})
export class BallPitComponent implements OnInit {
  ngOnInit() {
    let c = new fabric.StaticCanvas('c');

    let r = new fabric.Circle({
      left: 0,
      top: 100,
      fill: 'red',
      radius: 40,
    });

    c.add(r);

	const xVelocity:number = 0.35;
	const yVelocity:number = 0.22;

    function draw(time:number) {
	  let diameter:number = r.radius << 1;
	  let width:number = c.getWidth() - diameter;
	  let height:number = c.getHeight() - diameter;
	  let xPos:number = (time * xVelocity) % width;
	  let yPos:number = (time * yVelocity) % height;
	  
      if((((time * xVelocity) / width) % 2.0) >= 1.0) {
		xPos = width - xPos;
      }
      if((((time * yVelocity) / height) % 2.0) >= 1.0) {
		yPos = height - yPos;
      }

      r.set('left', xPos);
	  r.set('top', yPos);

      c.renderAll();
    }

    function animationLoop(time:number) {
      fabric.util.requestAnimFrame(animationLoop);
      draw(time);
    }

    fabric.util.requestAnimFrame(animationLoop);
  }
}
