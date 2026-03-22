<script>
	import Frame from '../Components/Frame.svelte';
	import Newsticker from '../Components/Misc/Newsticker.svelte';

	const tooltips = [
		'Pretty cool, huh?',
		"Please contribute to this if you want more content! It's quite literally open source."
	];
</script>

<Newsticker {tooltips} style={'default'} speed={2} />

<svelte:head>
	<title>Cool stuff here!</title>
</svelte:head>

<div
	style="background:url('/background.png') center/cover no-repeat;"
	class="absolute top-0 left-0 -z-10 h-full w-full"
></div>

<div class="flex min-h-screen items-center justify-center">
	<Frame positioning="relative" size={[800, 800]} offset={[0, 0]} title="Links">
		<div class="p-2 text-left">
			<div class="mt-4 my-2 w-full bg-orange-300 text-3xl">Welcome to my cool website!</div>

            There's nothing here. This is a placeholder
		</div>
	</Frame>
</div>
