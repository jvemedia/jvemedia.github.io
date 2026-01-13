import { OBJLoader } from "three/addons/loaders/OBJLoader.js"
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import type { Group, Object3DEventMap } from "three";

export class ObjFileLoader {
    
    private path: string;
    private filename: string;
    private material: MTLLoader.MaterialCreator | undefined;
    private loader = new OBJLoader();
    private mtlLoader = new MTLLoader();
    
    constructor(
        path: string,
        filename: string
    ) {
        this.path = path;
        this.filename = filename;
        this.loader.setPath(this.path);
        this.mtlLoader.setPath(this.path);
    }

    public async loadMaterials(): Promise<void> {
        this.material = await this.mtlLoader.loadAsync( this.filename + '.mtl' );
        this.material.preload();
        this.loader.setMaterials(this.material);
    }

    public async loadObject(): Promise<Group<Object3DEventMap>> {
        return this.loader.loadAsync(this.filename + '.obj');
    }

}