import { 
    AmbientLight,
    AxesHelper,
    Color,
    EquirectangularReflectionMapping,
    GridHelper,
    Object3D, 
    PerspectiveCamera, 
    PointLight, 
    Scene, 
    WebGLRenderer, 
    type Camera, 
    type Object3DEventMap 
} from "three";
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Environment {

    public camera: Camera;
    public scene = new Scene();
    public renderer = new WebGLRenderer({ alpha: true });
    private width = window.innerWidth;
    private height = window.innerHeight;

    constructor(
        isDefault = false,
        isDebug = false
    ){
        this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.scene.add(this.camera);
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);
        if (isDefault) {
            this.addDefaultLighting();
        }
        if (isDebug) {
            this.scene.add(new AxesHelper(5));
            this.scene.add(new GridHelper(5));

            //Other helpers:
            //BoxHelper
            //DirectionalLightHelper
            //SpotLightHelper
            //CameraHelper
        }
    }

    public addDefaultLighting(): void {
        const ambientLight = new AmbientLight( 0xffffff );
        this.scene.add( ambientLight );
        
        const pointLight = new PointLight( 0xffffff, 15 );
        this.camera.add( pointLight );
    }

    public changeCameraPos(axis: 'x' | 'y' | 'z', pos: number) {
        this.camera.position[axis] = pos;
    }

    public addToScene(thing: Object3D<Object3DEventMap>): void {
        this.scene.add(thing);
    };

    public render(): void {
        this.renderer.render(this.scene,  this.camera);
    }

    public async loadEnvHDR(path: string, filename: string): Promise<void> {
        const loader = new HDRLoader();
        const hdrData = await loader.loadAsync(path + filename);
        hdrData.mapping = EquirectangularReflectionMapping;
        this.scene.environment = hdrData;
    }

    public async loadGLTF(path: string, filename: string, objectName: string): Promise<Object3D<Object3DEventMap>> {
        const loader = new GLTFLoader();
        const gltfData = await loader.loadAsync(path + filename);

        this.scene.add(gltfData.scene);
        this.scene.add(this.camera);

        const object = gltfData.scene.getObjectByName(objectName);
        if (!object) {
            throw new Error();
        }
        return object;
    }
}