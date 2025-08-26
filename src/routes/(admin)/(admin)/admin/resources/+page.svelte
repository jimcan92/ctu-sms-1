<script lang="ts">
	import { ConfirmDialog } from '$lib/components';
	import { cn } from '$lib/cutils';
	import { deleteDocument } from '$lib/services/client/firebase/db';
	import { deleteFile } from '$lib/services/client/firebase/storage';
	import { selectedResources } from '$lib/stores/admin';
	import { PenSquare } from '@lucide/svelte';

	let busy = $state(false);

	async function onDelete(resource: AppResource) {
		busy = true;
		await deleteFile(resource.filename ?? '', `resources/${resource.subject}`);
		await deleteDocument('resources', resource.uid ?? '');
		busy = false;
	}
</script>

<div class="flex w-[100dvw] flex-col items-center justify-center md:w-full">
	<div class={cn('flex items-center justify-between', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Resources</h1>
		<a href="/admin/resources/new" class="btn btn-outline">Add New Resource</a>
	</div>
	<div class={cn('flex w-full justify-center p-4', 'md:p-8')}>
		<div class="bg-base-300 w-full max-w-6xl overflow-x-auto rounded-lg p-2 shadow-lg">
			<table class="table">
				<thead>
					<tr>
						<th></th>
						<th>Subject</th>
						<th>Title</th>
						<th>Description</th>
						<th>Filename</th>
						<th>Link ID</th>
						<th>Type</th>
						<th>URL</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each $selectedResources as resource, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td class="truncate">{resource.subject}</td>
							<td class="truncate">{resource.title}</td>
							<td class="truncate">{resource.description}</td>
							<td class="truncate">{resource.filename}</td>
							<td class="truncate">{resource.linkId}</td>
							<td class="truncate">{resource.type}</td>
							<td class="truncate">{resource.url}</td>
							<td class="join">
								<a href="/admin/resources/{resource.uid}" class="btn join-item btn-sm">
									<PenSquare size={18} />
								</a>
								{#if busy}
									<span class="join-item">
										<span class="loading loading-sm loading-spinner"></span>
									</span>
								{:else}
									<ConfirmDialog
										title="Delete '{resource.uid}'?"
										message="Are you sure you want to delete this section '{resource.uid}'"
										onConfirm={() => onDelete(resource)}
									/>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
