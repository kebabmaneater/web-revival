<script lang="ts">
	import { Player } from '../../Game/Player.svelte';
	import ProgressBar from './ProgressBar.svelte';
</script>

<div id="Skills">
	<table width="100%" class="table-auto">
		<tbody>
			{#each Object.entries(Player._player.skillData) as [, value], i (i)}
				<tr class="bg-green-600 text-gray-200 text-shadow-lg/20">
					<th>Misc.</th>
					<th>Level</th>
					<th>Effect</th>
					<th>Xp/tick</th>
					<th>Xp left</th>
				</tr>

				{#each Object.entries(value) as [_, value2], i (i)}
					<tr>
						<th class="text-gray-200 text-shadow-lg/20">
							<ProgressBar value={value2.xp / value2.getMaxXp()}>
								{value2.name}
							</ProgressBar>
						</th>
						<th>{value2.level}</th>
						<th>NONE</th>
						<th>{value2.getXpGain()}</th>
						<th>{value2.getXpLeft()}</th>
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>
</div>

