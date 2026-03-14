<script>
	import { Player } from '../../Game/Player.svelte';
	import { Update, MainLoop, Render } from '../../Game/Game.svelte';
	import Newsticker from '../Components/Misc/Newsticker.svelte';
	import Frame from '../Components/Frame.svelte';
	import Drag from '../Components/Drag.svelte';
	import You from '../Components/You.svelte';
	import Skills from '../Components/Skills.svelte';
	import { onMount } from 'svelte';
	import { getCurrentActions, getCurrentAction } from '../../Game/Actions.svelte';
	import { scale } from 'svelte/transition';

	onMount(() => {
		// Update.connect((updateData) => {
		// 	Player.money += updateData[0] / 1000;
		// 	Player._player.skillData.Misc[0].increaseXp();
		// });

        Render.connect(() => {
			Player._player = { ...Player._player };
        });

		MainLoop.start();
	});
</script>

<svelte:head>
	<title>Skill Incremental</title>
</svelte:head>

<div class="absolute top-0 left-0 -z-10 h-full w-full cursor-grab"></div>

<Newsticker />

<Drag>
	<Frame size={[640, 240]} offset={[0, 0]}>
		<You />
	</Frame>

	<Frame size={[400, 500]} offset={[-410, 0]}>
		<p>Skills</p>
		<Skills />
	</Frame>

	<Frame size={[460, 220]} offset={[650, 0]}>
		{#if getCurrentAction() === 'begging'}
			<img
				class="mx-2 my-4"
				src="/situations/beg.png"
				alt="What the hell i going on?"
				in:scale={{ duration: 300, start: 0, opacity: 1 }}
			/>
			<p>You are begging for money... Gaining 1 g/s</p>
		{:else}
			<p>You are idling around</p>
		{/if}
	</Frame>

	<Frame size={[460, 100]} offset={[650, 230]}>
		<p>Actions</p>
		<hr />
		{#each getCurrentActions() as action (action.id)}
			<button
				class="mt-1 w-100 cursor-pointer bg-linear-to-r from-orange-200/0 via-orange-300 to-orange-200/0"
				onclick={action.message_function}
			>
				{action.message}
			</button>
			<br />
		{/each}
	</Frame>

	<Frame size={[300, 50]} offset={[650, -60]}>
		<p>Playtime is {Player._player.playtime}</p>
		<p>Money is {Player._player.money.toFixed(2)}</p>
	</Frame>
</Drag>

<footer class="absolute bottom-8 left-4 text-gray-50">
	<p class="text-shadow-lg/80">
		Inspired by proto23, DodecaDragons, Antimatter Dimensions and every other glorious incremental dev!
	</p>
</footer>

<style lang="postcss">
	@reference "tailwindcss";

	:global(body) {
		@apply overflow-hidden font-mono select-none;
		background-color: rgb(68, 68, 62);
	}
</style>
