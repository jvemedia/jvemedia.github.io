//@ts-ignore
import { RotateAnimation } from "./animations/rotate-animation";
import { EventHelper } from "./helpers/event-helper";
import { Environment } from "./environments/default-environment";

//Set up environment
const environment = new Environment(false, false);

await environment.loadEnvHDR('/dist/objects/HDR/', 'hdrtest.hdr');
// const obj = await environment.loadGLTF('/objects/HDR/', 'uv_square_new.glb', 'Cube');
const obj = await environment.loadGLTF('/dist/objects/HDR/', 'tv.glb', 'tv');
// obj.scale.addScalar(1);
obj.translateY(1);

environment.changeCameraPos('z', 5);
environment.render(); //First frame

//Rotate animation
// new RotateAnimation(obj, environment, {x: 0.01, y: 0.01, z: 0}).rotateCube();

//Events
EventHelper.addClickDragRotateEvent(environment, obj);
// EventHelper.addClickDragCameraRotation(environment);