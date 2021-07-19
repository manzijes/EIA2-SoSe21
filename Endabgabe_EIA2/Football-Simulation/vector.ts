namespace Football {
   
    export class Vector {
        public x: number;
        public y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        // get difference between two vectors
        public static getDifference(_v0: Vector, _v1: Vector): Vector {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }

        // calculate length of a vector
        public get length(): number {
            return Math.hypot(this.x, this.y);
        }

        // set x and y property of object to _x and _y
        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        // multiply x and y property of object with _factor, save as new x and y property of object
        public scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        // add _addend to vector
        public add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        
        // copy a vector
        copy(): Vector {
            return new Vector(this.x, this.y);
        }
        
    }
}