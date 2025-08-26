<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot (prefix-icon to prefix_icon) making the component unusable -->
<script lang="ts">
	import { cn } from '$lib/cutils';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import type { SelectEvents } from '.';

	type $$Props = HTMLSelectAttributes & { label: string };
	type $$Events = SelectEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };
	export let disabled: boolean | null | undefined = false;
	export let label: string;
</script>

<div class="form-control w-full">
	<label for="idNumber" class="label">{label}</label>
	<div class="relative flex w-full">
		<span class="absolute inset-y-0 left-4 z-10 flex items-center justify-center">
			<slot name="prefix-icon" />
		</span>
		<select
			class={cn('select w-full', className, { 'pl-12': $$slots['prefix-icon'] })}
			bind:value
			{disabled}
			on:blur
			on:change
			on:click
			on:focus
			on:keydown
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:paste
			on:input
			{...$$restProps}
		>
			<slot />
		</select>
	</div>
</div>
