<script>
	import { Player } from '../../Game/Player.svelte';
	import { MainLoop, Render } from '../../Game/Game.svelte';
	import Newsticker from '../Components/Misc/Newsticker.svelte';
	import Frame from '../Components/Frame.svelte';
	import Drag from '../Components/Drag.svelte';
	import You from '../Components/You.svelte';
	import Skills from '../Components/Skills.svelte';
	import Options from '../Components/Options.svelte';
	import { onMount } from 'svelte';
	import { ActionManager } from '../../Game/Actions/BaseAction.svelte';

	onMount(() => {
		Render.connect(() => {
			Player._player = { ...Player._player };
			Player._player.stats = { ...Player._player.stats };
		});

		MainLoop.start();
	});

	const tooltips = [
		'Did you know that this game will update in 5 hours?',
		'This game was made using Svelte!',
		'Also try Antimatter Dimensions!',
		'I use Arch, btw.',
		'Fuck you NVIDIA!'
	];
</script>

<svelte:head>
	<title>Skill Incremental</title>
</svelte:head>

<div
	style="background:url('/background.png') center/cover no-repeat;"
	class="absolute top-0 left-0 -z-10 h-full w-full cursor-grab"
></div>

<Newsticker {tooltips} style={'default'} speed={2} />

<Frame
	size={[276, 100]}
	offset={[15, 46]}
	title={'Variables'}
	z_index={1_000_000_000_000}
	draggable={false}
>
	<p class="my-1 ml-1 text-left">
		Money: {Player.notation(Player.money, 2, 1)}
	</p>
</Frame>

<Drag>
	<Frame size={[640, 270]} offset={[0, 0]} title={'You'}>
		<You />
	</Frame>

	<Frame size={[340, 270]} offset={[0, 290]} title={'Inventory'}>
		<button
			class="w-100% mt-1 cursor-pointer bg-linear-to-r from-orange-200/0 via-orange-300 to-orange-200/0"
		>
			DOES NOTHING
		</button>
	</Frame>

	<Frame size={[700, 500]} offset={[-720, 0]} title={'Skills'}>
		<Skills />
	</Frame>

	<Frame size={[460, 280]} offset={[660, 0]} title={'Happenings'}>
        <svelte:component this={Player.currentAction.displayComponent()} />
	</Frame>

	<Frame size={[460, 280]} offset={[1140, 0]} title={'Battle'}>
		<p>You are not battling.</p>
	</Frame>

	<Frame size={[460, Player.currentActions.length * 28 + 50]} offset={[660, 300]} title={'Actions'}>
		{#each Player.currentActions as action (action.id)}
			<button
				class="mt-1 w-100 cursor-pointer bg-linear-to-r from-orange-200/0 via-orange-300 to-orange-200/0"
				onclick={() => ActionManager.onClicked(action)}
			>
				{action.displayName}
			</button>
			<br />
		{/each}
	</Frame>

	<Frame size={[300, 75]} offset={[660, -95]} title={'Stats'}>
		<p>Playtime is {Player.playtime}</p>
		<p>Money is {Player.notation(Player.money, 2, 1)}</p>
	</Frame>

	<Frame size={[460, 250]} offset={[660, -365]} title={'Options'}>
		<Options />
	</Frame>
</Drag>

<footer class="absolute bottom-8 left-4 text-gray-50" style="z-index: 1_000_000_000_000;">
	<p class="text-shadow-lg/80">
		Inspired by proto23, DodecaDragons, Antimatter Dimensions and every other glorious incremental
		dev!
	</p>
</footer>

<style lang="postcss">
	@reference 'tailwindcss';

	body {
		@apply overflow-hidden font-mono select-none;

		background-image: url('/background.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center center;
	}

    html, body { height: 100%; min-height 100% }
</style>
