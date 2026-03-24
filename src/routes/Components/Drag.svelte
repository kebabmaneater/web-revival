<script lang="ts">
	import { Player } from '../../Game/Player.svelte';

	let { children } = $props();

	let dragging = false;
	let offsetX = 0;
	let offsetY = 0;

	function startDrag(event: MouseEvent) {
		// Prevent drag if the target is a titlebar
		if ((event.target as HTMLElement)?.classList.contains('titlebar')) return;
		dragging = true;
		offsetX = event.clientX - Player.coordinates[0];
		offsetY = event.clientY - Player.coordinates[1];
		window.addEventListener('mousemove', onDrag);
		window.addEventListener('mouseup', stopDrag);
	}

	function onDrag(event: MouseEvent) {
		if (!dragging) return;
		Player.coordinates[0] = event.clientX - offsetX;
		Player.coordinates[1] = event.clientY - offsetY;
	}

	function stopDrag() {
		dragging = false;
		window.removeEventListener('mousemove', onDrag);
		window.removeEventListener('mouseup', stopDrag);
	}
</script>

<svelte:body onmousedown={startDrag} />
 
<div class="relative" style="left: {Player.coordinates[0]}px; top: {Player.coordinates[1]}px; z-index: 0">
	{@render children()}
</div>
