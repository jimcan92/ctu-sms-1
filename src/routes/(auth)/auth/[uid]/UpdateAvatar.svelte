<script lang="ts">
	import { page } from '$app/state';
	import { updateDocument, upload } from '$lib/services/client';
	import { Pen, Save, X } from '@lucide/svelte';

	interface Props {
		photoUrl?: string;
		imgName?: string;
		section?: string;
	}

	let { photoUrl = '', imgName = '', section = '' }: Props = $props();

	let dialog: HTMLDialogElement;
	let input: HTMLInputElement;
	let image: HTMLImageElement;

	let imgFile: File | null = null;

	let busy = $state(false);

	function onChange() {
		if (input.files) {
			imgFile = input.files[0];

			if (imgFile) {
				const reader = new FileReader();

				reader.addEventListener('load', async () => {
					const result = reader.result?.toString();

					image.setAttribute('src', result ?? '');
				});
				reader.readAsDataURL(imgFile);
			}
		}
	}

	const onUpload = async () => {
		if (imgFile) {
			busy = true;

			const filename = `${imgName}.${imgFile.type.split('/')[1]}`;
			imgFile = new File([imgFile], filename, { type: imgFile.type });
			const { url } = await upload(imgFile, `avatars/${section}`);

			if (url) {
				const uid = page.data.userSession?.uid;
				if (uid) {
					await updateDocument<Student>('students', uid, { photoUrl: url });
				}
			}

			busy = false;
		}

		dialog.close();
	};

	const onOpen = () => {
		if (!imgName || !section || imgName === '' || section === '')
			return alert('Set your name and section first!');
		dialog.showModal();
	};
</script>

<button class="btn absolute top-0 right-0 btn-circle btn-ghost btn-xs" onclick={onOpen}>
	<Pen size={18} />
</button>
<dialog bind:this={dialog} class="modal">
	<form class="modal-box max-w-max">
		<h3 class="mb-8 text-lg font-bold">Update Avatar</h3>
		<div class="flex flex-col items-center gap-4">
			<div class="avatar">
				<div class="w-72 rounded">
					<img class="w-full object-contain" bind:this={image} src={photoUrl} alt="" />
				</div>
			</div>
			<input
				type="file"
				bind:this={input}
				class="file-input w-72"
				accept=".jpg, .jpeg, .png"
				onchange={onChange}
			/>
		</div>
		<div class="modal-action">
			<button class="btn btn-ghost" type="button" onclick={() => dialog.close()}>
				<X size={18} /> Close
			</button>
			<button class="btn btn-accent" onclick={onUpload} disabled={busy}>
				{#if busy}
					<Save size={18} /> Saving <span class="loading loading-sm loading-dots"></span>
				{:else}
					<Save size={18} /> Save
				{/if}
			</button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>a</button>
	</form>
</dialog>
