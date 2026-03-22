<script lang="ts" module>
	let topZIndex = 0; // Shared across all Frame instances
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Player } from '../../Game/Player.svelte';

	let {
		positioning = 'absolute',
		draggable = true,
		children,
		size,
		offset,
		title = 'Frame',
		z_index = 0,
        extra_class = "",
	} = $props();
	let currentZIndex = $state(z_index ? z_index : topZIndex);

	let dragging = false;
	let dragStart = [0, 0];
	let offsetStart = [0, 0];

	let homePosition = [0, 0];

	let minimised = $state(false);
	let prevSize = [0, 0];

	onMount(() => {
		homePosition = [...offset];
		prevSize = [...size];
	});

	function bringToFront() {
		topZIndex += 1;
		currentZIndex = topZIndex;
	}

	function onTitlebarMouseDown(event: MouseEvent) {
		if (!draggable || Player.options.lockWindows)  return;

		bringToFront();

		dragging = true;
		dragStart = [event.clientX, event.clientY];
		offsetStart = [...offset];
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function onMouseMove(event: MouseEvent) {
		if (!dragging) return;
		offset = [
			offsetStart[0] + event.clientX - dragStart[0],
			offsetStart[1] + event.clientY - dragStart[1]
		];
	}

	function onMouseUp() {
		dragging = false;
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	}

	function resetPosition() {
		offset = [...homePosition];
	}

	function toggleMinimise() {
		if (!minimised) {
			prevSize = [...size];
			size = [prevSize[0], 25]; // Only show titlebar
			minimised = true;
		} else {
			size = [...prevSize];
			minimised = false;
		}
	}
</script>

<div
	class="{positioning} z-0 bg-linear-to-r from-orange-200 to-orange-100 text-center ring-4 flex flex-col"
	onmousedown={bringToFront}
	role="button"
	tabindex="0"
	style="box-shadow: 0 0 6px 1px #5c4227, 0 0 6px 2px #5c4227; width: {size[0]}px; height: {size[1]}px; top: {offset[1]}px; left: {offset[0]}px; z-index: {currentZIndex}"
>
	<div
		class="{extra_class} titlebar cursor-move bg-orange-300 px-2 text-left font-bold inset-shadow-sm inset-shadow-amber-700/50 drop-shadow-sm/40"
		role="button"
		onmousedown={onTitlebarMouseDown}
		style="user-select: none;"
		tabindex="0"
	>
		{title} -
		{#if draggable}
			<button class="titlebar" onclick={resetPosition} aria-label="Reset position"> Home </button>
		{/if}

		<button
			class="titlebar"
			onclick={toggleMinimise}
			aria-label={minimised ? 'Maximise' : 'Minimise'}
		>
			- {minimised ? 'Maximise' : 'Minimise'}
		</button>
	</div>

	{#if !minimised}
		<div class="flex-1 overflow-scroll">
			{@render children()}
		</div>
	{/if}
</div>
