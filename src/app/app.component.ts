import {Component, OnInit} from '@angular/core';
import * as Pixi from 'pixi.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public gravityValue: number = 5;
    public shapesPerSecond: number = 1;
    shapesAmount: number = 0;
    surfaceArea: number = 0;

    ngOnInit() {
        console.log(Pixi);
    }

    onShapesAmount(n) {
        this.shapesAmount = n;
    }

    decreaseShapes() {
        this.shapesPerSecond = Math.max(0, --this.shapesPerSecond);

    }

    increaseShapes() {
        this.shapesPerSecond++;
    }

    decreaseGravity() {
        this.gravityValue = Math.max(0, --this.gravityValue);
    }

    increaseGravity() {
        this.gravityValue++;
    }
}
