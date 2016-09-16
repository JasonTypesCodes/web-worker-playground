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
    console.log('In Init!');
    let c = new fabric.StaticCanvas('c');
    console.log(c);

    let r = new fabric.Circle({
      left: 100,
      top: 100,
      fill: 'red',
      radius: 40
    });

    c.add(r);

    let goRight:boolean = true;
    let left:number = 0;
    const pxPerTime:number = 0.45;
    let lastTime:number = -1;

    function draw(time:number) {
      lastTime = (lastTime === -1) ? time : lastTime;

      let amount:number = (time - lastTime) * pxPerTime;

      console.log('Amount is: ' + amount + ' : ' + lastTime + ' : ' + time);

      if(goRight){
        left+=amount;
      } else {
        left-=amount;
      }

      if((r.left + r.width) > c.getWidth()){
        goRight = !goRight;
        left = c.getWidth() - r.width;
      } else if(r.left < 0) {
        left = 0;
        goRight = !goRight;
      }

      r.set('left', left);

      lastTime = time;

      c.renderAll();
    }

    function animationLoop(time:number) {
      fabric.util.requestAnimFrame(animationLoop);
      draw(time);
    }

    fabric.util.requestAnimFrame(animationLoop);
  }
}
