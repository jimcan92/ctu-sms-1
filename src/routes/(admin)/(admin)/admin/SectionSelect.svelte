<script lang="ts">
	let optionDialog: HTMLDialogElement;

	interface Props {
		value: string;
		items: string[];
		label?: string | undefined;
	}

	let { value = $bindable(), items, label = undefined }: Props = $props();

	function onSelect(item: string) {
		value = item;
	}
</script>

<div class="form-control w-full">
	{#if label}
		<label for="section" class="label">{label}</label>
	{/if}
	<button class="select items-center truncate" onclick={() => optionDialog.showModal()}>
		{value}
	</button>
</div>
<dialog bind:this={optionDialog} class="modal">
	<form
		method="dialog"
		class="modal-box flex w-fit min-w-[160px] flex-col rounded-lg border border-base-content/50 px-0 py-2"
	>
		{#each items as item}
			<button class="btn rounded-none btn-ghost btn-sm" onclick={() => onSelect(item)}>
				{item}
			</button>
		{/each}
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
