import { Component, OnInit } from '@angular/core';
import { Drawable } from './Drawable';
import { Ball } from './Ball';
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

    let circsA:Drawable[] = [
      new Ball('red', 40, 0.35, 0.22),
      new Ball('blue', 50, 0.12, 0.45),
      new Ball('yellow', 25, 0.22, 0.19),
      new Ball('green', 35, 0.26, 0.41),
      new Ball('orange', 44, 0.28, 0.23),
      new Ball('purple', 21, 0.39, 0.31),
    ];

    circsA.forEach(item => { c.add(item.getFabricObject()) });

    let docBody = document.getElementsByTagName("body")[0];
    let canvas = document.getElementById("c");

    function draw(time:number) {
      let docStyle = window.getComputedStyle(docBody, null);
      let docWidth = parseInt(docStyle.getPropertyValue("width"));
      let docHeight = parseInt(docStyle.getPropertyValue("height")) - parseInt(docStyle.getPropertyValue("margin-top"));

      canvas.style.height = docHeight + "px";
      c.setHeight(docHeight);
      canvas.style.width = docWidth + "px";
      c.setWidth(docWidth);

      circsA.forEach(item => { item.draw(time, docWidth, docHeight) });

      c.renderAll();
    }


    function animationLoop(time:number) {
      fabric.util.requestAnimFrame(animationLoop);
      draw(time);
    }

    fabric.util.requestAnimFrame(animationLoop);
  }
}
