<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { dateStringToScheduleTime, mwf, ssa, timeFromSchedule, tth } from '$lib/cutils';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import {
		schedules as schedulesStore,
		sections as sectionsStore,
		subjects as subjectsStore
	} from '$lib/stores';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	let sections = $sectionsStore;
	let subjects = $subjectsStore;
	let schedules = $schedulesStore;

	let section = $state(sections.at(0)?.uid);
	let subject = $state(subjects.at(0)?.uid);
	let days: ScheduleDay[] = $state([]);
	let room = $state('');
	let start = $state(dayjs().format('HH:mm'));
	let end = $state(dayjs().format('HH:mm'));

	let schedule = schedules.find((s) => s.uid === page.params.uid);

	let prevPath: string = $state('/admin/schedules');

	onMount(() => {
		if (schedule) {
			section = schedule.section;
			subject = schedule.subject;
			days = schedule.days;
			room = schedule.room;
			start = timeFromSchedule(schedule.start).format('HH:mm');
			end = timeFromSchedule(schedule.end).format('HH:mm');
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	const onDaySelect: ChangeEventHandler<HTMLInputElement> = (e) => {
		const checked = e.currentTarget.checked;
		const value: ScheduleDay = e.currentTarget.value as ScheduleDay;

		if (checked) {
			days.push(value);
		} else {
			const i = days.indexOf(value);
			if (i > -1) {
				days.splice(i, 1);
			}
		}
	};

	async function onSave() {
		if (section && subject) {
			let sched: Schedule = {
				days,
				room,
				end: dateStringToScheduleTime(end),
				section,
				start: dateStringToScheduleTime(start),
				subject
			};

			if (schedule) sched.uid = schedule.uid;

			await saveDocument<Schedule>('schedules', sched);
			goto(prevPath);
		}
	}
</script>

<div class="flex flex-col p-4 md:p-8">
	<div class="bg-base-300 flex w-full max-w-sm flex-col gap-4 self-center rounded-lg p-6 shadow-lg">
		<h1 class="mb-4 text-xl font-semibold">
			{schedule ? `Edit '${schedule.subject} - ${schedule.section}'` : 'Add New schedule'}
		</h1>
		<select class="select" bind:value={section}>
			{#each sections as section}
				<option value={section.uid}>{section.name}</option>
			{/each}
		</select>
		<select class="select" bind:value={subject}>
			{#each subjects as subject}
				<option value={subject.uid}>{subject.uid}</option>
			{/each}
		</select>
		<div class="bg-base-100 flex flex-col gap-4 rounded-lg p-3">
			<div class="flex justify-evenly gap-2">
				{#each mwf as d}
					<span class="flex items-center justify-evenly gap-2">
						<input
							type="checkbox"
							name={d}
							class="checkbox checkbox-sm"
							checked={days.includes(d)}
							value={d}
							onchange={onDaySelect}
						/>
						<label for={d}>{d}</label>
					</span>
				{/each}
			</div>
			<div class="flex justify-evenly gap-2">
				{#each tth as d}
					<span class="flex items-center justify-evenly gap-2">
						<input
							type="checkbox"
							name={d}
							class="checkbox checkbox-sm"
							checked={days.includes(d)}
							value={d}
							onchange={onDaySelect}
						/>
						<label for={d}>{d}</label>
					</span>
				{/each}
			</div>
			<div class="flex justify-evenly gap-2">
				{#each ssa as d}
					<span class="flex items-center justify-evenly gap-2">
						<input
							type="checkbox"
							name={d}
							class="checkbox checkbox-sm"
							checked={days.includes(d)}
							value={d}
							onchange={onDaySelect}
						/>
						<label for={d}>{d}</label>
					</span>
				{/each}
			</div>
		</div>
		<input type="text" class="input" placeholder="Room" bind:value={room} />
		<input type="time" class="input" bind:value={start} />
		<input type="time" class="input" bind:value={end} />
		<div class="mt-4 flex justify-end gap-4">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" onclick={onSave}>Save</button>
		</div>
	</div>
</div>
