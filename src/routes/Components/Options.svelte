<script lang="ts">
	import { onMount } from 'svelte';
	import { Player } from '../../Game/Player.svelte';
	import * as ADNotations from '@antimatter-dimensions/notations';

	const notationList = [
		new ADNotations.ScientificNotation(),
		new ADNotations.EngineeringNotation(),
		new ADNotations.LettersNotation(),
		new ADNotations.StandardNotation(),
		new ADNotations.EmojiNotation(),
		new ADNotations.MixedScientificNotation(),
		new ADNotations.MixedEngineeringNotation(),
		new ADNotations.LogarithmNotation(),
		new ADNotations.MixedLogarithmSciNotation(),
		new ADNotations.BracketsNotation(),
		new ADNotations.InfinityNotation(),
		new ADNotations.RomanNotation(),
		new ADNotations.DotsNotation(),
		new ADNotations.ZalgoNotation(),
		new ADNotations.HexNotation(),
		new ADNotations.ImperialNotation(),
		new ADNotations.ClockNotation(),
		new ADNotations.PrimeNotation(),
		new ADNotations.BarNotation(),
		new ADNotations.ShiNotation(),
		new ADNotations.BlobsNotation(),
		new ADNotations.BlindNotation(),
		new ADNotations.AllNotation()
	];

	let notationStyle = $state(Player._player.notationStyle.name ?? notationList[0].name);

	const notationOptions = notationList.map((notation) => ({
		name: notation.name,
		instance: notation
	}));

	function getNotationFromName(name: string) {
		return notationOptions.find((option) => option.name === name) as typeof ADNotations.Notation;
	}

    function formatFromName(name: string, num: number, a: number, b: number) {
		const selected = getNotationFromName(name);
		if (!selected) return num.toFixed(2);

		return selected.instance.format(num, a, b);
    }

	$effect(() => {
		const selected = getNotationFromName(notationStyle);
		if (!selected) return;

		Player._player.notationStyle = selected.instance;
	});

	let number = $state(((Math.random() * 2) ** 100) * 1e100);

	onMount(() => {
		setInterval(() => {
			number = ((Math.random() * 2) ** 100) * 1e100;
		}, 10000);
	});
</script>

<label for="notation-style">Notation style -</label>
<select
	id="notation-style"
	bind:value={notationStyle}
	class="mt-1 cursor-pointer bg-linear-to-r from-orange-200/0 via-orange-300 to-orange-200/0 px-3 py-1 w-60"
>
	{#each notationOptions as option}
		<option value={option.name}>{option.name} - {formatFromName(option.name, number, 2, 0)}</option>
	{/each}
</select>
<br>
<input type="checkbox" name="lock-windows" bind:checked={Player.options.lockWindows}>
<label for="lock-windows"   > Lock windows</label><br>
