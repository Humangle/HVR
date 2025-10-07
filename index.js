import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

document.getElementById("taptoscroll").addEventListener('click', () => {
	document.getElementById("taptoscroll").style.display = "none";
	document.getElementById("youtube").scrollIntoView({
		behavior: 'smooth'
    });
});

const init = () => {

	//canvas
	const canvas = document.getElementById("container");
	const renderer = new THREE.WebGLRenderer({canvas, antialias: false, alpha: true, premultipliedAlpha: false, precision: 'highp', powerPreference: 'low-power'});
	renderer.setPixelRatio(1.0);
	renderer.setSize(canvas.clientWidth, window.innerHeight);

	const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 128);
	camera.position.set(0, 1.6, 0);
	
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 1.6, 0);
	controls.rotateSpeed *= -0.4;
	controls.autoRotate = false;
	controls.enableDamping = false;
	controls.enableZoom = false;
	controls.maxPolarAngle = Math.PI-0.8;
	controls.minPolarAngle = 0.8;
	controls.update();

	const scene = new THREE.Scene();
	const geometry = new THREE.SphereGeometry(100, 64, 32);
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
		if (window.innerHeight > window.innerWidth+(window.innerWidth/3)){
			if (window.scrollY > (document.getElementById("container").clientHeight)/8){
				document.getElementById("taptoscroll").style.display = "none";
			} else {
				document.getElementById("taptoscroll").style.display = "block";
				document.getElementById("taptoscroll").innerHTML = "▽";
			}
		}

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