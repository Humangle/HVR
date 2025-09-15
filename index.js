import * as THREE from 'three';

const init = () => {
	
	let isUserInteracting = false, 
		lon = 0, lat = 0,
		phi = 0, theta = 0,
		onPointerDownPointerX = 0,
		onPointerDownPointerY = 0,
		onPointerDownLon = 0,
		onPointerDownLat = 0;

	const distance = 0.5;

	//canvas
	const canvas = document.getElementById("container");
	const renderer = new THREE.WebGLRenderer({canvas, antialias: false, alpha: true, premultipliedAlpha: false, precision: 'lowp', powerPreference: 'low-power'});
	renderer.setPixelRatio(1.0);
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.25, 10);

	const scene = new THREE.Scene();

	const geometry = new THREE.SphereGeometry(5, 60, 40);
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale(-1, 1, 1);

	const video = document.getElementById('video');
	video.play();

	const texture = new THREE.VideoTexture(video);
	texture.colorSpace = THREE.SRGBColorSpace;
	const material = new THREE.MeshBasicMaterial({map: texture});

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	const render = () => {

		lat = Math.max(-85, Math.min(85, lat));
		phi = THREE.MathUtils.degToRad(90-lat);
		theta = THREE.MathUtils.degToRad(lon);

		camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
		camera.position.y = distance * Math.cos(phi);
		camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

		camera.lookAt(0, 0, 0);

		renderer.render(scene, camera);

	}
	
	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	}

	const onPointerDown = (event) => {

		isUserInteracting = true;

		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;

	}

	const onPointerMove = (event) => {

		if (isUserInteracting === true) {

			lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
			lat = (onPointerDownPointerY - event.clientY) * 0.1 + onPointerDownLat;

		}

	}

	const onPointerUp = () => {

		isUserInteracting = false;

	}

	document.addEventListener('pointerdown', onPointerDown);
	document.addEventListener('pointermove', onPointerMove);
	document.addEventListener('pointerup', onPointerUp);

	//

	window.addEventListener('resize', onWindowResize);
	
	renderer.setAnimationLoop(render);

}

init();