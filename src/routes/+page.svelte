<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { palettes } from '$lib/palettes';

	let paletteIndex = $state(0);
	const palette = $derived(palettes[paletteIndex]);

	function cyclePalette() {
		paletteIndex = (paletteIndex + 1) % palettes.length;
	}

	$effect(() => {
		document.body.style.backgroundColor = palette.background;
	});
</script>

<div class="pointer-events-none fixed inset-0 z-0">
	<Canvas>
		<Scene {palette} />
	</Canvas>
</div>

<div
	class="relative z-10 flex min-h-screen flex-col font-sans [transition:color_700ms_ease]"
	style:color={palette.main}
>
	<Navbar {palette} onCyclePalette={cyclePalette} />
	<div class="h-12"></div>

	<main class="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
		<p class="mb-8 font-sans text-xs font-medium uppercase tracking-[0.35em] opacity-60">
			Design Engineer
		</p>
		<h1
			class="font-display mb-8 text-6xl font-bold leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
		>
			Gábor<br />Lant
		</h1>
		<p class="mb-14 max-w-xs text-base leading-relaxed opacity-75 md:max-w-sm md:text-lg">
			Building precise, expressive interfaces<br />where engineering meets craft.
		</p>
		<a
			href="#work"
			class="group inline-flex min-h-[44px] items-center gap-2.5 px-7 text-base font-medium hover:opacity-80 [transition:background-color_700ms_ease,color_700ms_ease,opacity_200ms_ease]"
			style:background-color={palette.accent}
			style:color={palette.background}
		>
			Selected work
			<span class="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
		</a>
	</main>

	<section id="work"></section>
	<section id="about"></section>
	<section id="contact"></section>

	<footer class="flex items-center justify-between px-8 py-6 text-xs opacity-50 md:px-16">
		<span>© 2026 Gabor Lant</span>
		<div class="flex gap-6">
			<a
				href="https://github.com/lantgabor"
				class="transition-opacity duration-200 hover:opacity-100">GitHub</a
			>
			<a
				href="https://linkedin.com/in/lantgabor"
				class="transition-opacity duration-200 hover:opacity-100">LinkedIn</a
			>
		</div>
	</footer>
</div>
