<script lang="ts">
	import { onMount } from 'svelte';

	const TOOLTIPS = [
		'Did you know that this game will update in 5 hours?',
		'This game was made using Svelte!',
		'Also try Antimatter Dimensions!',
		'I use Arch, btw.',
		'Fuck you NVIDIA!'
	];

	let tickerEl = $state<HTMLDivElement | null>(null);
	let containerEl = $state<HTMLDivElement | null>(null);
	let x = $state(0);
	let current = $state(0);
	const speed = 2; // pixels per frame

	function loop() {
		if (tickerEl && containerEl) {
			x -= speed;
			const tickerWidth = tickerEl.scrollWidth;
			const containerWidth = containerEl.offsetWidth;
			if (-x >= tickerWidth + 200) {
				// Move to next tooltip
				current = (current + 1) % TOOLTIPS.length;
				x = containerWidth;
			}
			tickerEl.style.transform = `translateX(${x}px)`;
		}
	}

    function animate() {
      loop();
      requestAnimationFrame(animate);
    }

	onMount(() => {
		x = containerEl ? containerEl.offsetWidth : 0;
		animate();
	});
</script>

<div
	bind:this={containerEl}
	class="absolute top-0 z-10 flex h-6 w-full items-center overflow-hidden bg-gray-800 text-sm text-white"
>
	<div bind:this={tickerEl} class="whitespace-nowrap" style="will-change: transform;">
		{TOOLTIPS[current]}
	</div>
</div>

