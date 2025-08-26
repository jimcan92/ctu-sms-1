<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { subjects } from '$lib/stores';
	import { onMount } from 'svelte';

	let code = $state('');
	let title = $state('');

	let codeInput: HTMLInputElement;
	let titleTextarea: HTMLTextAreaElement;

	let subject = $subjects.find((s) => s.uid === page.params.code);

	let prevPath = $state('/admin/subjects');

	onMount(() => {
		if (subject) {
			code = subject.uid ?? '';
			title = subject.title;
			titleTextarea.focus();
		} else {
			codeInput.focus();
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	async function onSave() {
		await saveDocument<Subject>('subjects', {
			uid: code,
			title
		});
		goto(prevPath);
	}
</script>

<div class="flex flex-col px-4 pt-12 md:px-8">
	<div class="flex w-full max-w-sm flex-col gap-4 self-center rounded-lg bg-base-300 p-6 shadow-lg">
		<h1 class="mb-4 text-xl font-semibold">
			{subject ? `Edit '${subject.uid}''` : 'Add New Section'}
		</h1>
		<input
			type="text"
			class="input"
			bind:this={codeInput}
			disabled={!!subject}
			placeholder="Code"
			bind:value={code}
		/>
		<textarea class="textarea" bind:this={titleTextarea} bind:value={title} placeholder="Title"
		></textarea>
		<div class="mt-4 flex justify-end gap-4">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" onclick={onSave}>Save</button>
		</div>
	</div>
</div>
