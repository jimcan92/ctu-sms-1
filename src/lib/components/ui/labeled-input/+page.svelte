<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot (prefix-icon to prefix_icon) making the component unusable -->
<script lang="ts">
	import { cn } from '$lib/cutils';
	import { X } from '@lucide/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from '.';

	type $$Props = HTMLInputAttributes & { label: string; disableClearButton?: boolean };
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };
	export let disabled: boolean | null | undefined = false;
	export let label: string;
	export let disableClearButton = false;
</script>

<div class="form-control w-full">
	<label for="idNumber" class="label">{label}</label>
	<div class="relative flex w-full">
		<span class="absolute inset-y-0 left-4 z-10 flex items-center justify-center">
			<slot name="prefix-icon" />
		</span>
		<input
			class={cn('input w-full', className, {
				'pl-12': $$slots['prefix-icon'],
				'pr-12': !disableClearButton
			})}
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
		/>
		<span class="absolute inset-y-0 right-4 z-10 flex items-center justify-center">
			{#if !disableClearButton && !disabled && value}
				<button type="button" class="btn btn-circle btn-ghost btn-sm" on:click={() => (value = '')}>
					<X />
				</button>
			{/if}
		</span>
	</div>
</div>
