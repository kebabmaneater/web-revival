<script lang="ts">
	export let value: number = 0;

	$: progress = Math.max(0, Math.min(1, value));
</script>

<div class="h-full w-full overflow-hidden bg-blue-800 bg-blend-color-dodge">
	<div
		class="h-full text-left"
		style="
      width: {progress * 100}%;
      background: linear-gradient(90deg, #ffe259 0%, #ffa751 100%);
    "
	>
		<span class="ml-1">
			<slot />
		</span>
	</div>
</div>
