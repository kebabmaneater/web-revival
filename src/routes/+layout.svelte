<script lang="ts">
	import { resolve } from '$app/paths';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<footer class="absolute z-10 bottom-0 w-full bg-gray-500">
	<nav>
		<a class="bg-blue-600 px-3 text-white transition hover:bg-blue-700" href={resolve('/')}>home</a>
		<a class="bg-blue-600 px-3 text-white transition hover:bg-blue-700" href={resolve('/game')}
			>game</a
		>
	</nav>
</footer>

{@render children()}
