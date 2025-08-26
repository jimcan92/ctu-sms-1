<script lang="ts">
	import { ConfirmDialog } from '$lib/components';
	import { cn, timeToDisplay } from '$lib/cutils';
	import { deleteDocument } from '$lib/services/client/firebase/db';
	import { schedules } from '$lib/stores';
	import { PenSquare } from '@lucide/svelte';

	async function onDelete(uid?: string) {
		if (!uid) return;
		await deleteDocument('schedules', uid);
	}
</script>

<div class="flex w-[100dvw] flex-col items-center justify-center md:w-full">
	<div class={cn('flex items-center justify-between', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Schedules</h1>
		<a href="/admin/schedules/new" class="btn btn-outline">Add New Schedule</a>
	</div>
	<div class={cn('flex w-full justify-center p-4', 'md:p-8')}>
		<div class="bg-base-300 w-full max-w-6xl overflow-x-auto rounded-lg p-2 shadow-lg">
			<table class="table">
				<thead>
					<tr>
						<th></th>
						<th>Section</th>
						<th>Subject</th>
						<th>Days</th>
						<th>Room</th>
						<th>Start</th>
						<th>End</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each $schedules as schedule, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td class="truncate">{schedule.section}</td>
							<td class="truncate">{schedule.subject}</td>
							<td class="truncate">{schedule.days.join('')}</td>
							<td class="truncate">{schedule.room}</td>
							<td class="truncate">{timeToDisplay(schedule.start)}</td>
							<td class="truncate">{timeToDisplay(schedule.end)}</td>
							<td class="join">
								<a href="/admin/schedules/{schedule.uid}" class="btn join-item btn-sm">
									<PenSquare size={18} />
								</a>
								<ConfirmDialog
									title="Delete '{schedule.uid}'?"
									message="Are you sure you want to delete this section '{schedule.uid}'"
									onConfirm={() => onDelete(schedule.uid)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
