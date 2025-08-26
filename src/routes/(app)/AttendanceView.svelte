<script lang="ts">
	import { EventListTile } from '$lib/components';
	import { displayTime, getAttendanceToView } from '$lib/cutils';
	import { attendance, selectedDate } from '$lib/stores';

	let attendanceToView = $derived(getAttendanceToView($attendance, $selectedDate.toDate()));
</script>

<div class="flex w-full max-w-sm flex-col gap-4 self-center">
	{#each attendanceToView as attendance}
		<EventListTile type="attendance">
			<div class="flex gap-4">
				<strong>Subject :</strong>
				<p>{attendance.for}</p>
			</div>
			<div class="flex gap-4">
				<strong>Time :</strong>
				<p>{displayTime(attendance.time.toDate())}</p>
			</div>
		</EventListTile>
	{/each}
</div>
