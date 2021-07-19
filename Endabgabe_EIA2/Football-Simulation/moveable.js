"use strict";
var Football;
(function (Football) {
    class Moveable {
        constructor(_position, _velocity) {
            this.position = _position;
            this.velocity = _velocity;
        }
    }
    Football.Moveable = Moveable;
})(Football || (Football = {}));
//# sourceMappingURL=moveable.js.map