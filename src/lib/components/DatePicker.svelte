<script lang="ts">
	import { cn } from '$lib/cutils';
	import { selectedDate } from '$lib/stores';
	import { SkipBack, SkipForward } from '@lucide/svelte';
	import dayjs from 'dayjs';
	import type { ChangeEventHandler } from 'svelte/elements';
	import RollingDigit from './RollingDigit.svelte';

	let dateInput: HTMLInputElement;

	let date = $derived($selectedDate);

	let d = $derived(date.get('date'));
	let m = $derived(date.get('month') + 1);
	let y = $derived(date.get('year'));

	function next() {
		selectedDate.set(date.add(1, 'day'));
	}

	function prev() {
		selectedDate.set(date.add(-1, 'day'));
	}

	const onDateInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		selectedDate.set(dayjs(event.currentTarget.value));
	};
</script>

<div class={cn('flex flex-col items-center justify-center', 'w-full max-w-sm gap-2 self-center')}>
	<div class="flex w-full gap-2">
		<button class="btn" onclick={prev} aria-label="Decrease the counter by one">
			<SkipBack size={18} />
		</button>
		<button onclick={() => dateInput.showPicker()} class="btn flex-1">
			<RollingDigit bind:value={m} />
			<span class="font-bold">-</span>
			<RollingDigit bind:value={d} />
			<span class="font-bold">-</span>
			<RollingDigit bind:value={y} />
		</button>
		<input
			class="hidden"
			type="date"
			bind:this={dateInput}
			value={date.format('YYYY-MM-DD')}
			onchange={onDateInputChange}
		/>
		<button class="btn" onclick={next} aria-label="Increase the counter by one">
			<SkipForward size={18} />
		</button>
	</div>
	{#if !dayjs().isSame(date, 'day')}
		<button class="btn w-full" onclick={() => selectedDate.set(dayjs())}>Today</button>
	{/if}
</div>
