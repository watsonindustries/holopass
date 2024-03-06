<script lang="ts">
	export let name: string;
	export let image: string | null = null;

	const gradients = {
		powder: 'bg-gradient-to-r from-violet-200 to-pink-200',
		holly: 'bg-gradient-to-r from-blue-200 to-cyan-200',
		twilight: 'bg-gradient-to-r from-amber-500 to-pink-500',
		'raw-green': 'bg-gradient-to-r from-lime-400 to-lime-500',
		rosebud: 'bg-gradient-to-r from-pink-500 to-rose-500'
	};

	function randomGradient(): string {
		const keys = Object.keys(gradients);
		const randomIndex = Math.floor(Math.random() * keys.length);
		const randomGradientName = keys[randomIndex];
		return gradients[randomGradientName as keyof typeof gradients];
	}

	const randomGradientStyle = randomGradient();
</script>

<div
	class="{image ??
		randomGradientStyle} flex h-14 w-full items-center justify-center rounded-xl outline-dashed outline-offset-1 outline-neutral/80"
>
	<p>{name}</p>
</div>
