import { Component, OnInit } from '@angular/core';
// import fabric from '../../ext/fabric';
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

    let r = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    c.add(r);

    let goRight:boolean = true;
    let left:number = 0;
    const amount:number = 4;
    const interval:number = 33;

    setInterval(function() {

      if((r.left + r.width) >= c.getWidth() || r.left <= 0){
        goRight = !goRight;
      }

      if(goRight){
        left+=amount;
      } else {
        left-=amount;
      }

      r.set('left', left);

      c.renderAll();
      console.log('Should be there');
    }, interval);

  }
}
