<script lang="ts">
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { cn, dateStringToScheduleTime } from '$lib/cutils';
	import { saveDocument } from '$lib/services/client';
	import { selectedDate } from '$lib/stores';
	import { selectedSubject, selectedUid } from '$lib/stores/admin';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';

	let dialog: HTMLDialogElement;
	let reason = $state('');
	let time = $state(dayjs().format('HH:mm'));

	let notToday = $derived(!dayjs().isSame($selectedDate, 'day'));

	async function onAttendance() {
		if ($selectedUid && $selectedSubject) {
			const selected = $selectedDate;
			let buf = dayjs();

			if (notToday) {
				const st = dateStringToScheduleTime(time);
				buf = buf
					.set('year', selected.year())
					.set('month', selected.month())
					.set('date', selected.date())
					.set('hour', st.h)
					.set('minute', st.m)
					.set('second', 0);
			}

			await saveDocument<Attendance>('attendance', {
				for: $selectedSubject,
				owner: $selectedUid,
				time: Timestamp.fromDate(buf.toDate())
			});
		}
	}
</script>

<button class="btn join-item w-full max-w-sm" onclick={() => dialog.showModal()}>
	Attendance
</button>
<dialog bind:this={dialog} class="modal">
	<form method="dialog" class="modal-box flex max-w-fit flex-col gap-2">
		<h3 class="text-lg font-bold">Attendance</h3>
		{#if notToday}
			<LabeledInput
				type="time"
				class="input-bordered input"
				label="Time"
				bind:value={time}
				disableClearButton
			/>
		{/if}
		<LabeledInput label="Reason" bind:value={reason} class="input-bordered" />
		<div class="modal-action">
			<button class="btn btn-ghost">Cancel</button>
			<button class={cn('btn btn-accent', { 'btn-warning': !!reason })} onclick={onAttendance}>
				{reason ? 'Excuse' : 'Present'}
			</button>
		</div>
	</form>
</dialog>
