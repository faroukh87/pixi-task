import * as Pixi from 'pixi.js';

export class Circle {

    static create(r, c, x, y) {
        const graphics = new PIXI.Graphics();
        graphics.interactive = true;
        graphics.beginFill(c);
        graphics.drawCircle(x, y, r);
        graphics.endFill();
        return graphics;
    }
}
