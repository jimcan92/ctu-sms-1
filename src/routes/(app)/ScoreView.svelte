<script lang="ts">
	import { EventListTile } from '$lib/components';
	import { getScoresToView, toTitleCase } from '$lib/cutils';
	import { scores as scoresStore, selectedDate } from '$lib/stores';

	let scores = $derived(getScoresToView($scoresStore, $selectedDate.toDate()));
</script>

<div class="flex w-full max-w-sm flex-col gap-4 self-center">
	{#each scores as score}
		<EventListTile type="score">
			<div class="flex gap-4">
				<strong>Subject :</strong>
				<p>{score.for}</p>
			</div>
			{#if score.no}
				<div class="flex gap-4">
					<strong>{toTitleCase(score.type)} # :</strong>
					<p>{score.no}</p>
				</div>
			{:else}
				<div class="flex gap-4">
					<strong>Type :</strong>
					<p>{toTitleCase(score.type)}</p>
				</div>
			{/if}
			<div class="flex gap-4">
				<strong>Score :</strong>
				<p>{`${score.value}/${score.perfect}`}</p>
			</div>
		</EventListTile>
	{/each}
</div>
