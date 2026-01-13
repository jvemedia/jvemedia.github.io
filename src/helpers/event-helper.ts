import type { Object3D, Object3DEventMap } from "three";
import type { Environment } from "../environments/default-environment";

export class EventHelper {

    public static initEvents(
        environment: Environment,
        obj: Object3D<Object3DEventMap>
    ) {
        this.addClickDragRotateEvent(environment, obj);
    }

    public static addClickDragRotateEvent(
        environment: Environment,
        obj: Object3D<Object3DEventMap>
    ): void {

        let previousMousePosition = { x: window.innerWidth/2, y: window.innerHeight/2 };
        const renderer = environment.renderer;

        renderer.domElement.addEventListener('mousemove', (e) => {

            requestAnimationFrame(function () {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;

                obj.rotation.y += deltaX/360;
                obj.rotation.x += deltaY/360;

                previousMousePosition.x = e.clientX;
                previousMousePosition.y = e.clientY;
            });

            environment.render();
        
        });

    }

    public static addClickDragCameraRotation(environment: Environment): void {

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        const renderer = environment.renderer;
        const camera = environment.camera;

        renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition.x = e.clientX;
            previousMousePosition.y = e.clientY;
        });

        renderer.domElement.addEventListener('mouseup', () => {
            isDragging = false;
        });

        renderer.domElement.addEventListener('mousemove', (e) => {

            if (!isDragging){ 
                return;
            };

            requestAnimationFrame(function () {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;

                camera.rotation.y += deltaX * 0.005;
                camera.rotation.x += deltaY * 0.005;

                previousMousePosition.x = e.clientX;
                previousMousePosition.y = e.clientY;
            });

            environment.render();
        
        });

    }

}