<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

	let darkMode = $state(false);

	$effect(() => {
		document.body.style.backgroundColor = darkMode ? '#000000' : '#F0F4FF';
	});
</script>

<div class="pointer-events-none fixed inset-0 z-0">
	<Canvas>
		<Scene {darkMode} />
	</Canvas>
</div>

<div
	class="relative z-10 flex min-h-screen flex-col font-sans transition-colors duration-700"
	style:color={darkMode ? '#E8EFFE' : '#1B3260'}
>
	<header class="flex items-center justify-between px-8 py-6 md:px-16">
		<span class="cursor-default text-base font-semibold tracking-tight">GL</span>
		<nav class="flex items-center gap-6">
			<a href="#work" class="text-sm opacity-50 transition-opacity duration-200 hover:opacity-100"
				>Work</a
			>
			<a href="#about" class="text-sm opacity-50 transition-opacity duration-200 hover:opacity-100"
				>About</a
			>
			<a
				href="#contact"
				class="text-sm opacity-50 transition-opacity duration-200 hover:opacity-100">Contact</a
			>
			<button
				type="button"
				aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
				onclick={() => (darkMode = !darkMode)}
				class="relative ml-2 h-4 w-4 opacity-50 transition-opacity duration-200 hover:opacity-100"
			>
				<span
					class="absolute inset-0 transition-opacity duration-300 {darkMode
						? 'opacity-0'
						: 'opacity-100'}"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				</span>
				<span
					class="absolute inset-0 transition-opacity duration-300 {darkMode
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="4" />
						<path
							d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M17.66 6.34l-1.41 1.41M6.34 17.66l-1.41 1.41"
						/>
					</svg>
				</span>
			</button>
		</nav>
	</header>

	<main class="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
		<p class="mb-8 text-[10px] font-medium uppercase tracking-[0.35em] opacity-40">
			Design Engineer
		</p>
		<h1
			class="mb-8 text-6xl font-bold leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
		>
			Gabor<br />Lant
		</h1>
		<p class="mb-14 max-w-xs leading-relaxed opacity-50 md:max-w-sm md:text-lg">
			Building precise, expressive interfaces<br />where engineering meets craft.
		</p>
		<a
			href="#work"
			class="group inline-flex items-center gap-2.5 rounded-full border px-7 py-3 text-sm font-medium transition-all duration-300 {darkMode
				? 'border-[#E8EFFE]/25 hover:border-transparent hover:bg-[#4B7BE5] hover:text-[#000000]'
				: 'border-[#1B3260]/25 hover:border-transparent hover:bg-[#4B7BE5] hover:text-[#F0F4FF]'}"
		>
			Selected work
			<span class="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
		</a>
	</main>

	<footer class="flex items-center justify-between px-8 py-6 text-xs opacity-30 md:px-16">
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
