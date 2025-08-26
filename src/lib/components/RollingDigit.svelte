<script lang="ts">
	import { cn, modulo } from '$lib/cutils';
	import { Spring } from 'svelte/motion';

	interface Props {
		value: number;
		fontSize?: string;
	}

	let { value = $bindable(), fontSize = 'text-lg' }: Props = $props();

	const count = new Spring(0);
	$effect(() => {
		count.set(value);
	});
	let offset = $derived(modulo(count.current, 1));

	const cls = 'flex w-full h-full items-center justify-center';
</script>

<div class={cn('overflow-hidden', fontSize)}>
	<div class="relative" style="transform: translate(0, {100 * offset}%)">
		<span class={cn(cls, 'absolute -top-full select-none')} aria-hidden="true">
			{Math.floor(count.current + 1)
				.toString()
				.padStart(2, '0')}
		</span>
		<span class={cls}>
			{Math.floor(count.current).toString().padStart(2, '0')}
		</span>
	</div>
</div>
