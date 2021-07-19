namespace Football {

    export abstract class Moveable {

        public position: Vector;
        public velocity: number;

        constructor(_position: Vector, _velocity: number) {
            this.position = _position;
            this.velocity = _velocity;
        }

        public abstract draw(): void;

        public abstract move(): void;

    }
}