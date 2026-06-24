<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import isolinesFrag from '../assets/isolines.frag?raw';

	let { darkMode }: { darkMode: boolean } = $props();

	const lightBgColor = new THREE.Color('#F0F4FF');
	const lightLineColor = new THREE.Color('#4B7BE5');
	const darkBgColor = new THREE.Color('#000000');
	const darkLineColor = new THREE.Color('#4B7BE5');

	const vertexShader = `
		void main() {
			gl_Position = vec4(position.xy, 0.0, 1.0);
		}
	`;

	const fragmentShader = `
		uniform vec2 iResolution;
		uniform float iTime;
		uniform vec3 uBackgroundColor;
		uniform vec3 uLineColor;

		${isolinesFrag}

		void main() {
			mainImage(gl_FragColor, gl_FragCoord.xy);
		}
	`;

	const uniforms = {
		iTime: { value: 0.0 },
		iResolution: { value: new THREE.Vector2(1, 1) },
		uBackgroundColor: { value: new THREE.Color('#F0F4FF') },
		uLineColor: { value: new THREE.Color('#4B7BE5') }
	};

	onMount(() => {
		const updateResolution = () => {
			uniforms.iResolution.value.set(
				window.innerWidth * window.devicePixelRatio,
				window.innerHeight * window.devicePixelRatio
			);
		};
		updateResolution();
		window.addEventListener('resize', updateResolution);
		return () => window.removeEventListener('resize', updateResolution);
	});

	useTask((delta) => {
		uniforms.iTime.value += delta;

		const targetBg = darkMode ? darkBgColor : lightBgColor;
		const targetLine = darkMode ? darkLineColor : lightLineColor;
		const lerpFactor = 1 - Math.exp(-4.0 * delta);

		uniforms.uBackgroundColor.value.lerp(targetBg, lerpFactor);
		uniforms.uLineColor.value.lerp(targetLine, lerpFactor);
	});
</script>

<T.Mesh>
	<T.PlaneGeometry args={[2, 2]} />
	<T.ShaderMaterial
		{vertexShader}
		{fragmentShader}
		{uniforms}
		depthWrite={false}
		depthTest={false}
	/>
</T.Mesh>
