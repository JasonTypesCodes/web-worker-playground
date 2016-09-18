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
	
	let circsA = [
		ball('red', 40, 0.35, 0.22),
		ball('blue', 50, 0.12, 0.45),
		ball('yellow', 25, 0.22, 0.19),
		ball('green', 35, 0.26, 0.41),
		ball('orange', 44, 0.28, 0.23),
		ball('purple', 21, 0.39, 0.31),
	];
	
	circsA.forEach(function (item) { c.add(item.circle); } );

	let docBody = document.getElementsByTagName("body")[0];
	let canvas = document.getElementById("c");

    function draw(time:number) {
		let docStyle = window.getComputedStyle(docBody, null);
		let docWidth = parseInt(docStyle.getPropertyValue("width"));
		let docHeight = parseInt(docStyle.getPropertyValue("height")) 
				- parseInt(docStyle.getPropertyValue("margin-top"));
	  
		canvas.style.height = docHeight + "px";
		c.setHeight(docHeight);
		canvas.style.width = docWidth + "px";
		c.setWidth(docWidth);
		
		circsA.forEach(function(item) {item.draw(time, docWidth, docHeight); });
		
		c.renderAll();
	}
	
	function ball(bc:string, br:number, xV:number, yV:number) {
		if (bc == undefined) {
			bc = 'red';
		}
		if (br == undefined) {
			br = 40;
		}
		if (xV == undefined) {
			xV = 0.2;
		}
		if (yV == undefined) {
			yV = 0.2;
		}
		
		var ballObj = {
			color : bc,
			radius : br,
			xVelocity : xV,
			yVelocity : yV,
				
			circle : new fabric.Circle({
				fill: bc,
				radius: br,
			}),
		
			draw : function(time:number, docWidth:number, docHeight:number) {
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
		return ballObj;
	}

    function animationLoop(time:number) {
      fabric.util.requestAnimFrame(animationLoop);
      draw(time);
    }

    fabric.util.requestAnimFrame(animationLoop);
  }
}
