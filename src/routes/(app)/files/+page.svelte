<script lang="ts">
	import { Select, YoutubeVideo } from '$lib/components';
	import fileIcon from '$lib/images/file.png';
	import {
		currentSchedule,
		currentSubject,
		resources,
		subjects as subjectsStore
	} from '$lib/stores';

	let value: string = $state('');

	let subjects = $derived($subjectsStore.map((s) => s.uid ?? ''));
	$effect(() => {
		if (!$currentSubject) currentSubject.set($subjectsStore.at(0)?.uid ?? '');
	});
	$effect(() => {
		if (value) {
			currentSubject.set(value);
		} else {
			currentSubject.set($currentSchedule?.subject);
		}
	});

	let appResources = $derived($resources);
</script>

<div class="flex w-full flex-col items-center gap-4">
	<div class="flex w-full justify-center bg-base-300 p-4">
		<Select label="Subject" bind:value items={subjects} />
	</div>
	{#each appResources as resource}
		<div class="card w-full max-w-sm bg-base-200">
			<div class="card-body">
				<h2 class="card-title">{resource.title}</h2>
				{#if resource.description}
					<p>{resource.description}</p>
				{/if}
				{#if resource.type === 'link'}
					{#if resource.linkId}
						<YoutubeVideo bind:linkId={resource.linkId} />
					{/if}
					<a class="link" href={resource.url}>{resource.url}</a>
				{/if}
				{#if resource.type === 'file'}
					<div class="mt-2 flex items-center">
						<img class="mr-4 w-16 rounded-lg bg-base-content p-2" src={fileIcon} alt="" />
						<a href={resource.url} class="link">{resource.filename}</a>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
