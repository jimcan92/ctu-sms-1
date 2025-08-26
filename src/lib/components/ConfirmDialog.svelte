<script lang="ts">
	import { Trash2 } from '@lucide/svelte';

	interface Props {
		title: string;
		message: string;
		onConfirm?: () => void;
	}

	let { title, message, onConfirm }: Props = $props();

	let dialog: HTMLDialogElement;
</script>

<button class="btn join-item btn-sm" onclick={() => dialog.showModal()}>
	<Trash2 size={18} />
</button>
<dialog bind:this={dialog} class="modal">
	<form method="dialog" class="modal-box max-w-fit">
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">{message}</p>
		<div class="modal-action">
			<button class="btn btn-ghost">Cancel</button>
			<button class="btn btn-accent" onclick={onConfirm}>Delete</button>
		</div>
	</form>
</dialog>
