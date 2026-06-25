<script lang="ts">
	import type { Palette } from '$lib/palettes';

	interface Props {
		palette: Palette;
		onCyclePalette: () => void;
	}

	let { palette, onCyclePalette }: Props = $props();
</script>

<header
	class="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b px-8 py-3 [transition:background-color_700ms_ease,color_700ms_ease,border-color_700ms_ease] md:px-16"
	style:background-color={palette.background}
	style:color={palette.main}
	style:border-color={palette.sub}
>
	<span class="font-display cursor-default text-sm font-semibold tracking-tight">GL</span>
	<nav class="flex items-center gap-5" role="navigation" aria-label="Main navigation">
		<a href="#work" class="text-base opacity-75 transition-opacity duration-200 hover:opacity-100">
			Work
		</a>
		<a href="#about" class="text-base opacity-75 transition-opacity duration-200 hover:opacity-100">
			About
		</a>
		<a
			href="#contact"
			class="text-base opacity-75 transition-opacity duration-200 hover:opacity-100"
		>
			Contact
		</a>
		<button
			type="button"
			aria-label="Cycle color palette"
			onclick={onCyclePalette}
			class="-my-3 ml-1 flex cursor-pointer items-center py-3 hover:opacity-80"
		>
			<span
				class="block h-5 w-5 [transition:background-color_700ms_ease]"
				style:background-color={palette.accent}
			></span>
		</button>
	</nav>
</header>
