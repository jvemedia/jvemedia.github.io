import type { Object3D, Object3DEventMap } from "three";
import type { Environment } from "../environments/default-environment";

export class RotateAnimation {
    private obj: Object3D<Object3DEventMap>;
    private environment: Environment;
    private speeds: { x: number, y: number, z: number };
    
    constructor(
        object: Object3D<Object3DEventMap>,
        environment: Environment,
        speeds: { x: number, y: number, z: number }
    ) {
        this.obj = object;
        this.environment = environment;
        this.speeds = speeds
    }

    public rotateCube = (): void => {
        requestAnimationFrame(this.rotateCube);
        this.obj.rotation.x += this.speeds.x;
        this.obj.rotation.y += this.speeds.y;
        this.environment.render();
    }
}