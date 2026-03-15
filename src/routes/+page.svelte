<script>
	import Frame from './Components/Frame.svelte';
	import Drag from './Components/Drag.svelte';
	import CoolNewsticker from './Components/Misc/CoolNewsticker.svelte';
</script>

I will include cool stuff here

<svelte:head>
	<title>Cool stuff here!</title>
</svelte:head>

<CoolNewsticker />

<div class="absolute top-0 left-0 -z-10 h-full w-full cursor-grab"></div>

<Drag>
	<Frame size={[880, 1900]} offset={[-140, 0]}>
		<h1 class="w-full text-3xl">WELCOME TO MY COOL WEBSITE</h1>
		<hr />

		<p>This is a cool website type shi</p>

		<center>
			<img
				class="mx-2 my-4 w-150 bg-center"
				src="/situations/beg.png"
				alt="What the hell i going on?"
			/>
			<img
				class="mx-2 my-4 w-150 bg-center"
				src="/situations/mugged.png"
				alt="What the hell i going on?"
			/>
			<img
				class="mx-2 my-4 w-150 bg-center"
				src="/situations/stick.png"
				alt="What the hell i going on?"
			/>
		</center>
	</Frame>
</Drag>

<style lang="postcss">
	@reference "tailwindcss";

	:global(body) {
		@apply overflow-hidden font-mono select-none;
		background-color: rgb(68, 68, 62);
	}
</style>
