import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Pixi from 'pixi.js';
import {Circle} from "../../classes/circle";

@Component({
    selector: 'app-pixi-field',
    templateUrl: './pixi-field.component.html',
    styleUrls: ['./pixi-field.component.css']
})
export class PixiFieldComponent implements OnInit {
    public stageWidth: number = 720;
    public stageHeight: number = 360;
    public app: any;
    public renderer: any;
    private shapes: Array<any> = [];

    public stage: Pixi.Container;
    @Input() gravityValue: number;
    @Input() shapesPerSecond: number;
    @Output() shapesAmount: EventEmitter<number> = new EventEmitter();

    constructor(public el: ElementRef) {

    }

    ngOnInit() {
        this.initializeArea();
        this.startGeneratingInterval();
        this.startRemoveInterval();
    }

    startRemoveInterval() {
        setInterval(() => {
            this.shapes.forEach((shape) => {
                if (shape) {
                    if (shape.y > this.stageHeight + 200) {
                        this.destroyShape(shape);
                    }
                }
            });
        }, 500);
    }

    initializeArea() {
        this.renderer = Pixi.autoDetectRenderer(this.stageWidth, this.stageHeight, {
            backgroundColor: 0x000000,
            antialias: true
        });
        this.el.nativeElement.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.stage.hitArea = new Pixi.Rectangle(0, 0, this.renderer.width, this.renderer.height)
        this.stage.interactive = true;
        this.stage.on('click', this.onStageClick.bind(this));
        this.animate();
    }

    animate() {
        this.moveShapes();
        this.renderer.render(this.stage);
        requestAnimationFrame(this.animate.bind(this));
    }

    moveShapes() {
        this.shapes.forEach((shape) => {
            if (shape) {
                shape.y += 0.1 * this.gravityValue;
            }
        });
    }

    onStageClick(e) {
        const x = e.data.global.x;
        const y = e.data.global.y;
        this.createRandomElement(x, y);
        e.stopPropagation();
        return false;
    }

    createRandomElement(x, y) {
        const circle = Circle.create(20, 0x445577, x, y);
        circle.on('click', (e) => {
            this.destroyShape(circle);
            e.stopPropagation();
            return false;
        });
        this.shapes.push(circle);
        this.stage.addChild(circle);
        this.shapesAmount.emit(this.shapes.length);
    }

    destroyShape(shape) {
        shape.removeAllListeners();
        shape.parent.removeChild(shape);
        this.shapes = this.shapes.filter(item => {
            return item !== shape;
        });
        this.shapesAmount.emit(this.shapes.length);
    }

    startGeneratingInterval() {
        setInterval(() => {
            this.generateRandomShapes();
        }, 1000);
    }

    generateRandomShapes() {
        for (let i = 0; i < this.shapesPerSecond; i++) {
            this.generateRandomShape();
        }
    }

    generateRandomShape() {
        const x = Math.floor(Math.random() * this.stageWidth);
        const y = -100;
        this.createRandomElement(x, y);
    }
}
