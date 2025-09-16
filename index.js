import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const init = () => {
	
	/**let isUserInteracting = false, 
		lon = 0, lat = 0,
		phi = 0, theta = 0,
		onPointerDownPointerX = 0,
		onPointerDownPointerY = 0,
		onPointerDownLon = 0,
		onPointerDownLat = 0;

	//const distance = 0.5;*/

	//canvas
	const canvas = document.getElementById("container");
	const renderer = new THREE.WebGLRenderer({canvas, antialias: false, alpha: true, premultipliedAlpha: false, precision: 'lowp', powerPreference: 'low-power'});
	renderer.setPixelRatio(1.0);
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 128);
	camera.position.set(0, 1.6, 0);
	console.log(camera.rotation.y);
	
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 1.6, 0);
	controls.rotateSpeed *= -0.4;
	controls.autoRotate = false;
	controls.enableDamping = false;
	controls.enableZoom = false;
	controls.maxPolarAngle = Math.PI-0.8;
	controls.minPolarAngle = 0.8;
	controls.update();
	console.log(camera.rotation.y);

	const scene = new THREE.Scene();
	scene.background = null;
	const geometry = new THREE.SphereGeometry(100, 64, 32);
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale(-1, 1, 1);

	const video = document.getElementById('video');
	video.play();

	const texture = new THREE.VideoTexture(video);
	texture.colorSpace = THREE.SRGBColorSpace;
	const material = new THREE.MeshBasicMaterial({map: texture});

	const mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = (-95/180)*Math.PI;
	scene.add(mesh);
	
	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	}
	
	const render = () => {

		renderer.render(scene, camera);

	}

	
	renderer.setAnimationLoop(render);
	renderer.domElement.addEventListener("pointerup", () => {
		renderer.domElement.style.cursor = "grab";
	});
	renderer.domElement.addEventListener("pointerdown", () => {
		renderer.domElement.style.cursor = "grabbing";
	});
	window.addEventListener('resize', onWindowResize);
}

init();