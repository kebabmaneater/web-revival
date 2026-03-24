<script lang="ts">
	import { resolve } from '$app/paths';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<footer
	class="fixed bottom-0 z-10 w-full bg-linear-to-t from-slate-800 to-gray-700"
	style="z-index: 1_000_000_000_000;"
>
	<nav class="flex items-center justify-center gap-4">
		<a
			class="w-28 bg-linear-to-r from-blue-800/0 via-blue-600 to-blue-800/0 px-3 text-center text-white transition hover:via-yellow-600"
			href={resolve('/')}>home</a
		>
		<a
			class="w-28 bg-linear-to-r from-blue-800/0 via-blue-600 to-blue-800/0 px-3 text-center text-white transition hover:via-yellow-600"
			href={resolve('/game')}>game</a
		>
		<a
			class="w-28 bg-linear-to-r from-blue-800/0 via-blue-600 to-blue-800/0 px-3 text-center text-white transition hover:via-yellow-600"
			href={resolve('/novel')}>novel</a
		>
	</nav>
</footer>

{@render children()}
