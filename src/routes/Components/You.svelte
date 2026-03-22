<script lang="ts">
	import { Player } from "../../Game/Player.svelte";
	import Stats from './Player/Stats.svelte';

	let items = $state(['Weapon', 'Shield', 'Head', 'Body', 'L Arm', 'R Arm', 'Legs', 'Accessory']);

	function formatEuroNumber(value: number) {
		return value.toLocaleString('de-DE', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
</script>

<p>You</p>
<p>lvl 0: 'nobody'</p>
<p class="text-center">exp: 0 | money: {Player._player.notationStyle.format(Player.money,2, 1)}</p>
<br />

<!-- <span class="grid grid-cols-2 grid-rows-4 gap-x-2 pb-4"> -->
<!-- 	{#each items as item (item)} -->
<!-- 		<span class="w-1/3 relative border-2 bg-orange-300">{item}</span> -->
<!-- 	{/each} -->
<!--     <Stats /> -->
<!-- </span> -->

<div class="flex">
  <!-- Stats on the left -->
  <div id="Stats" class="w-2/7 bg-[#bebbb0] text-left">
    {#each Object.entries(Player._player.stats) as [stat, value], i (i)}
      <span class="ml-2">{stat}:</span>
      <span>{formatEuroNumber(value.value)}</span>
      <br />
    {/each}
  </div>

  <!-- Items grid on the right -->
  <div class="w-5/7 grid grid-cols-2 grid-rows-4 gap-1 mx-2 h-36">
    {#each items as item (item)}
      <div class="bg-orange-300 border-2 flex items-center justify-center inset-shadow-xs inset-shadow-orange-400">{item}</div>
    {/each}
  </div>
</div>
