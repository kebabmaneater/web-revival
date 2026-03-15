<script lang="ts">
	import { onMount } from 'svelte';

	const TOOLTIPS = [
		'THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. THERE IS NO ESCAPE. '
	];

	let tickerEl = $state<HTMLDivElement | null>(null);
	let containerEl = $state<HTMLDivElement | null>(null);
	let x = $state(0);
	let current = $state(0);
	const speed = 2; // pixels per frame

	function loop() {
		if (tickerEl) {
			x -= speed;
			const singleWidth = tickerEl.scrollWidth / 2;
			if (-x >= singleWidth) {
				x += singleWidth;
			}
			tickerEl.style.transform = `translateX(${x}px)`;
		}
	}

	function animate() {
		loop();
		requestAnimationFrame(animate);
	}

	onMount(() => {
		x = 0;
		animate();
	});
</script>

<div
	bind:this={containerEl}
	class="absolute top-0 z-10 flex h-6 w-full items-center overflow-hidden bg-gray-800 text-sm text-white"
>
	<div bind:this={tickerEl} class="flex whitespace-nowrap" style="will-change: transform;">
		<span>{TOOLTIPS[current]}</span>
		<span aria-hidden="true">{TOOLTIPS[current]}</span>
	</div>
</div>
