<script lang="ts">
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { LabeledSelect } from '$lib/components/ui/labeled-select';
	import { cn, toTitleCase } from '$lib/cutils';
	import { saveDocument } from '$lib/services/client';
	import { selectedDate } from '$lib/stores';
	import { selectedSubject, selectedUid } from '$lib/stores/admin';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';

	let dialog: HTMLDialogElement;

	const terms: ScoreTerm[] = ['midterm', 'final'];
	const types: ScoreFor[] = ['quiz', 'assignment', 'project', 'participation'];

	let term: ScoreTerm = $state('midterm');
	let scoreFor: ScoreFor = $state('quiz');
	let perfect = $state('100');
	let value = $state('');
	let no: string | undefined = $state();

	async function onSave() {
		if ($selectedUid && $selectedSubject) {
			const selected = $selectedDate;
			let buf = dayjs();

			if (!buf.isSame($selectedDate, 'day')) {
				buf = buf
					.set('year', selected.year())
					.set('month', selected.month())
					.set('date', selected.date());
			}

			const score: Score = {
				owner: $selectedUid,
				perfect: Number(perfect),
				for: $selectedSubject,
				term,
				type: scoreFor,
				value: Number(value),
				no: Number(no),
				time: Timestamp.fromDate(buf.toDate())
			};
			await saveDocument<Score>('scores', score);
		}
	}
</script>

<button class="btn join-item w-full max-w-sm" onclick={() => dialog.showModal()}> Score </button>
<dialog bind:this={dialog} class="modal">
	<form method="dialog" class="modal-box flex max-w-fit flex-col gap-2">
		<h3 class="text-lg font-bold">Score</h3>
		<div class="flex gap-2">
			<LabeledSelect label="Term" class="select-bordered" bind:value={term}>
				{#each terms as t}
					<option value={t}>{toTitleCase(t)}</option>
				{/each}
			</LabeledSelect>
		</div>
		<div class="flex gap-2">
			<LabeledSelect label="Type" class="select-bordered" bind:value={scoreFor}>
				{#each types as t}
					<option value={t}>{toTitleCase(t)}</option>
				{/each}
			</LabeledSelect>
			{#if scoreFor === 'quiz' || scoreFor === 'assignment'}
				<LabeledInput
					type="number"
					class="input-bordered"
					label="{toTitleCase(scoreFor)} #"
					bind:value={no}
				/>
			{/if}
		</div>
		<div class="flex gap-2">
			<LabeledInput type="number" class="input-bordered" label="Perfect" bind:value={perfect} />
			<LabeledInput type="number" class="input-bordered" label="Score" bind:value />
		</div>
		<div class="modal-action">
			<button class="btn btn-ghost">Cancel</button>
			<button class={cn('btn btn-accent')} onclick={onSave}> Save </button>
		</div>
	</form>
</dialog>
