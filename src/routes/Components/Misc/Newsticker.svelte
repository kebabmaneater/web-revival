<script lang="ts">
	import { onMount } from 'svelte';

	type style = 'default' | 'seamless';
	interface Props {
		tooltips: string[];
		style: style;
		speed: number;
	}
	let {
		tooltips = [],
		style,
		speed = 2 // in pixels
	}: Props = $props();

	let tickerEl = $state<HTMLDivElement | null>(null);
	let containerEl = $state<HTMLDivElement | null>(null);
	let x = $state(0);
	let current = $state(0);

	function loop() {
		if (!tickerEl || !containerEl) return;

		if (style === 'default') {
			x -= speed;
			const tickerWidth = tickerEl.scrollWidth;
			const containerWidth = containerEl.offsetWidth;
			if (-x >= tickerWidth + 200) {
				current = (current + 1) % tooltips.length;
				x = containerWidth;
			}
			tickerEl.style.transform = `translateX(${x}px)`;
		} else if (style === 'seamless') {
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
		x = containerEl ? containerEl.offsetWidth : 0;
		animate();
	});
</script>

<div
	bind:this={containerEl}
	class="absolute top-2 left-2 z-10 flex h-6 w-[calc(100%-1rem)] items-center overflow-hidden bg-linear-to-t from-slate-800 to-gray-700 text-sm text-white"
	style="box-shadow: 0 0 6px 1px #423d3a, 0 0 6px 2px #423d3a; z-index: 1_000_000_000_000;"
>
	<div
		bind:this={tickerEl}
		class="flex whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
		style="will-change: transform;"
	>
		<span aria-hidden="true">{tooltips[current]}</span>
	</div>
</div>
