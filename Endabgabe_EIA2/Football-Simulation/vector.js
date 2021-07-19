"use strict";
var Football;
(function (Football) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        // get difference between two vectors
        static getDifference(_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        // calculate length of a vector
        get length() {
            return Math.hypot(this.x, this.y);
        }
        // set x and y property of object to _x and _y
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        // multiply x and y property of object with _factor, save as new x and y property of object
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        // add _addend to vector
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        // copy a vector
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    Football.Vector = Vector;
})(Football || (Football = {}));
//# sourceMappingURL=vector.js.map