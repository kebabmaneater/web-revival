<script>
	import Frame from './Components/Frame.svelte';
	import Newsticker from './Components/Misc/Newsticker.svelte';
	import HoverImage from './Components/Misc/HoverImage.svelte';
	import Gif from './Components/Misc/Gif.svelte';

	const tooltips = [
		'Welcome to my cool ☆ website ☆ If you like the content feel welcome to stay!',
		'Made on Arch Linux with Niri btw.',
		'If you REALLY REALLY like this website the source is open! Feel free to contribute.'
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

<div class="absolute top-50 left-50">
	<Gif />
</div>

<div class="flex min-h-screen w-full items-center justify-center">
	<div class="grid h-100 w-full grid-flow-col grid-rows-2 items-center justify-center gap-5">
		<Frame positioning="relative" size={[300, 400]} offset={[0, -100]} title={'Sites'}>
			<div class="grid grid-cols-2 gap-2 p-2">
				<a href="https://halfofbilly.com"
					><img class="w-full" src="https://halfofbilly.com/button.gif" alt="img" /></a
				>
				<a href="https://onio.neocities.org" title="Visit Onio Café"
					><img
						class="w-full"
						src="https://onio.neocities.org/thebutton.gif"
						alt="Come Chat With Us!"
						width="88"
						height="31"
					/></a
				>
			</div>
		</Frame>

		<Frame positioning="relative" size={[300, 385]} offset={[0, 100]} title={'Stuff'}>Stuff</Frame>

		<Frame
			extra_class={'row-span-2'}
			positioning="relative"
			size={[800, 800]}
			offset={[0, 100]}
			title={'Main'}
		>
			<div class="p-2 text-left">
				<div class="my-2 mt-4 w-full bg-orange-300 text-3xl">Welcome to my cool website!</div>
				<div class="grid grid-cols-2 gap-0">
					<img src="/situations/beg.png" alt="img" />
					<img src="/situations/mugged.png" alt="img" />
				</div>

				<p>This is a cool website type shi</p>
				Join
				<a
					class="text-blue-500 underline hover:no-underline"
					href="https://thoughts.melonking.net/guides/introduction-to-the-web-revival-1-what-is-the-web-revival"
					target="_blank"
					rel="noopener noreferrer">Web Revival</a
				>

				<div class="my-2 mt-8 w-full bg-orange-300 text-3xl">
					Peak novel recommendations (read em)
				</div>

				<div class="mx-16 mt-4 grid grid-cols-3 gap-16">
					<HoverImage
						href="https://www.novelupdates.com/series/im-an-infinite-regressor-but-ive-got-stories-to-tell/"
						src="https://cdn.novelupdates.com/images/2024/04/The-Tale-of-an-Infinite-Regressor.jpeg"
						alt="infinite regressor"
						text="I'm an Infinite Regressor"
					/>

					<HoverImage
						href="https://www.novelupdates.com/series/ten-day-ultimatum/"
						src="https://cdn.novelupdates.com/images/2024/07/Ten-Day-Ultimatum.png"
						alt="ten day ultimatum"
						text="Ten Day Ultimatum"
					/>

					<HoverImage
						href="https://www.novelupdates.com/series/a-regressors-tale-of-cultivation/"
						src="https://novelfire.net/server-1/a-regressors-tale-of-cultivation.jpg"
						alt="ten day ultimatum"
						text="Regressor's Tale of Cultivation"
					/>
				</div>

				<div class="my-2 mt-8 w-full bg-orange-300 text-3xl">About</div>

				T'was a cool website! Here's the&nbsp;<a
					class="text-blue-500 underline hover:no-underline"
					href="https://codeberg.org/Zerrox/skill-incremental">Source code</a
				>
			</div></Frame
		>
	</div>
</div>

<footer class="absolute bottom-8 left-4 text-gray-50" style="z-index: 1_000_000_000_000;">
	<p class="text-shadow-lg/80">
		What is up? That is up. Very up. Are you up? Are we up? We are up!
	</p>
</footer>
