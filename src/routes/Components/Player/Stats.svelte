<script lang="ts">
	import { Player } from '../../../Game/Player.svelte';

	// const tooltips = [
	// 	{ label: 'STR', title: 'Strength <hr> Dictates attack damage' },
	// 	{ label: 'MANA', title: 'Mana <hr> A power that has existed since the start of time' },
	// 	{ label: 'AGL', title: 'Agility <hr> Increases dodge chance' },
	// 	{ label: 'SPD', title: 'Speed <hr> More speed equals less time on skills and actions' },
	// 	{ label: 'INT', title: 'Intelligence <hr> Mana EXP multiplier' },
	// 	{ label: 'DEF', title: 'Defense <hr> Damage reduction' }
	// ];

	const PADDING = 9;

	function groupChars(val: string, padding: number) {
		const padded = val.padStart(padding, '0');
		const groups = [];
		for (let i = 0; i < padded.length; i += 3) {
			groups.push(padded.slice(i, i + 3));
		}
		return groups;
	}
</script>

<div id="Stats" class="w-44 bg-[#bebbb0] text-center">
	{#each Object.entries(Player._player.stats) as [stat, value], i (i)}
		<span>{stat}:</span>
		{#each groupChars(value.toString(), PADDING) as group, idx}
			{#each group.split('') as char, cidx}
				{#if idx * 3 + cidx < PADDING - value.toString().length}
					<span class="text-gray-400">{char}</span>
				{:else}
					<span>{char}</span>
				{/if}
			{/each}
			{#if idx < groupChars(value.toString(), PADDING).length - 1}
				<span> </span>
			{/if}
		{/each}
		<br />
	{/each}
</div>
