<script lang="ts">
	let { children, size, offset } = $props();
</script>

<div
	class="absolute z-0 overflow-scroll bg-linear-to-r from-orange-200 to-orange-100 text-center shadow-lg ring-2 inset-shadow-sm"
	style="width: {size[0]}px; height: {size[1]}px; top: {offset[1]}px; left: {offset[0]}px"
>
	{@render children()}
</div>

