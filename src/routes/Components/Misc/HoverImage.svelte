<script lang="ts">
	let { href, src, alt, text } = $props();
</script>

<a
	class="group relative shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
	{href}
>
	<img {src} {alt} class="aspect-3/4 w-full object-cover" />
	<div
		class="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 via-black/90 to-transparent p-2"
	>
		<span class="bg-black text-lg font-semibold text-white drop-shadow"> {text} </span>
	</div>
</a>
