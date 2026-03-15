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

	function formatEuroNumber(value: number) {
		return value.toLocaleString('de-DE', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
</script>

<div id="Stats" class="w-44 bg-[#bebbb0] text-center">
	{#each Object.entries(Player._player.stats) as [stat, value], i (i)}
		<span>{stat}:</span>
		<span>{formatEuroNumber(value.value)}</span>
		<br />
	{/each}
</div>
