import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export class DefaultCube {
    
    private cube: Mesh;
    private geometry = new BoxGeometry();
    private material: MeshBasicMaterial;
    
    constructor(
        color: number
    ) {
        this.material = new MeshBasicMaterial({color: color});
        this.cube = new Mesh(this.geometry, this.material);
    }

    public getCube(): Mesh {
        return this.cube;
    }
}