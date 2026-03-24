<script>
	import { Player } from '../../Player.svelte';
</script>

<img class="mx-2 my-4" src="/situations/beg.png" alt="What the hell i going on?" />
<p>
	You are begging for money... Gaining {Player.notation(
		Player.skillData.Jobs[0].level * 0.2 + 1,
		2,
		1
	)} g / s
</p>
