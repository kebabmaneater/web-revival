<script lang="ts">
	import { Player } from "../../Game/Player.svelte";
	import Stats from './Player/Stats.svelte';
</script>

<p>You</p>
<p>lvl 0: 'nobody'</p>
<p class="text-center">exp: 0 | money: {Player.money.toFixed(1)}</p>
<br />
<Stats />

<span class="grid grid-cols-2 grid-rows-4 gap-x-2 pb-4">
	<!-- {#each items as item (item)} -->
	<!-- 	<span class="w-50% relative border-2 bg-orange-300">{item}</span> -->
	<!-- {/each} -->
</span>

