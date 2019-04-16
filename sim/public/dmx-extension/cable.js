class Cable {
    
    constructor(firstObject, secondObject) {
        this.firstObject = firstObject;
        this.secondObject = secondObject;
    }

    display() {
        stroke(255);
        line(this.firstObject.x, this.firstObject.y, this.secondObject.x, this.secondObject.y);
    }

}