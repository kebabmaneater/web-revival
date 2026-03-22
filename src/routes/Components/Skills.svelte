<script lang="ts">
	import { Player } from '../../Game/Player.svelte';
	import ProgressBar from './ProgressBar.svelte';

    let colors = ["bg-green-600", "bg-red-500"]
</script>

<div id="Skills">
	<table width="100%" class="table-auto">
		<tbody>
			{#each Object.entries(Player._player.skillData) as [name, value], i (i)}
				<tr class="text-gray-200 text-shadow-lg/20 {colors[i]}">
					<th class="w-20/60">{name}</th>
					<th class="w-10/60">Level</th>
					<th class="w-10/60">Effect</th>
					<th class="w-10/60">Xp/tick</th>
					<th class="w-10/60">Xp left</th>
				</tr>

				{#each Object.entries(value) as [_, value2], i (i)}
					<tr>
						<th class="text-gray-200 text-shadow-lg/20">
							<ProgressBar value={value2.xp / value2.getMaxXp()}>
								{value2.name}
							</ProgressBar>
						</th>
						<th>{Player.notation(value2.level, 2, 0)}</th>
						<th>NONE</th>
						<th>{Player.notation(value2.getXpGain(), 2, 0)}</th>
						<th>{Player.notation(value2.getXpLeft(), 2, 0)}</th>
					</tr>
				{/each}

				<tr><td colspan="5" class="h-4"></td></tr>
			{/each}
		</tbody>
	</table>
</div>

