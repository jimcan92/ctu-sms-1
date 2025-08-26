<script lang="ts">
	import { ConfirmDialog } from '$lib/components';
	import { cn } from '$lib/cutils';
	import { deleteDocument } from '$lib/services/client/firebase/db';
	import { subjects } from '$lib/stores';
	import { PenSquare } from '@lucide/svelte';

	async function onDelete(uid?: string) {
		if (!uid) return;
		await deleteDocument('subjects', uid);
	}
</script>

<div class="flex w-[100dvw] flex-col items-center justify-center md:w-full">
	<div class={cn('flex items-center justify-between', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Subjects</h1>
		<a href="/admin/subjects/new" class="btn btn-outline">Add New Subject</a>
	</div>
	<div class={cn('flex w-full justify-center p-4', 'md:p-8')}>
		<div class="bg-base-300 w-full max-w-6xl overflow-x-auto rounded-lg p-2 shadow-lg">
			<table class="table">
				<thead class="text-lg">
					<tr>
						<th></th>
						<th>Code</th>
						<th>Title</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each $subjects as subject, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td>{subject.uid}</td>
							<td>{subject.title}</td>
							<td class="join">
								<a href="/admin/subjects/{subject.uid}" class="btn join-item btn-sm">
									<PenSquare size={18} />
								</a>
								<ConfirmDialog
									title="Delete '{subject.uid}'?"
									message="Are you sure you want to delete this subject '{subject.uid}'"
									onConfirm={() => onDelete(subject.uid)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
