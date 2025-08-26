<script lang="ts">
	import { ConfirmDialog } from '$lib/components';
	import { cn } from '$lib/cutils';
	import { deleteDocument } from '$lib/services/client/firebase/db';
	import { sections } from '$lib/stores';
	import { PenSquare } from '@lucide/svelte';

	async function onDelete(uid?: string) {
		if (!uid) return;
		await deleteDocument('sections', uid);
	}
</script>

<div class="flex w-[100dvw] flex-col items-center justify-center md:w-full">
	<div class={cn('flex items-center justify-between', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Sections</h1>
		<a href="/admin/sections/new" class="btn btn-outline">Add New Section</a>
	</div>
	<div class={cn('flex w-full justify-center p-4', 'md:p-8')}>
		<div class="bg-base-300 w-full max-w-6xl overflow-x-auto rounded-lg p-2 shadow-lg">
			<table class="table">
				<thead class="text-lg">
					<tr>
						<th></th>
						<th>Section Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each $sections as section, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td class="truncate">{section.name}</td>
							<td class="join">
								<a href="/admin/sections/{section.name}" class="btn join-item btn-sm">
									<PenSquare size={18} />
								</a>
								<ConfirmDialog
									title="Delete '{section.name}'?"
									message="Are you sure you want to delete this section '{section.name}'"
									onConfirm={() => onDelete(section.uid)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
