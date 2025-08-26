<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { sections as sectionsStore } from '$lib/stores';
	import { onMount } from 'svelte';

	let sections = $sectionsStore;
	let name: string = $state('');
	let section = sections.find((s) => s.uid === page.params.uid);
	let prevPath: string = $state('/admin/sections');

	onMount(() => {
		nameInput.focus();
		if (section) {
			name = section.name;
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	let nameInput: HTMLInputElement;

	async function onSave() {
		let sec: Section = {
			uid: name,
			name
		};

		await saveDocument<Section>('sections', sec);
		goto(prevPath);
	}
</script>

<div class="flex flex-col px-4 pt-12 md:px-8">
	<div class="flex w-full max-w-sm flex-col gap-4 self-center rounded-lg bg-base-300 p-6 shadow-lg">
		<h1 class="mb-4 text-xl font-semibold">
			{section ? `Edit '${section.uid}'` : 'Add New Section'}
		</h1>
		<input
			type="text"
			class="input"
			bind:this={nameInput}
			bind:value={name}
			placeholder="Section Name"
		/>
		<div class="mt-4 flex justify-end gap-4">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" onclick={onSave}>Save</button>
		</div>
	</div>
</div>
