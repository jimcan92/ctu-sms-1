<script lang="ts">
	import Select from './SectionSelect.svelte';

	import { goto } from '$app/navigation';
	import { AdminNav, Avatar, NavListTile } from '$lib/components';
	import { db, signOut } from '$lib/services/client';
	import { currentSchedule, currentStudent, currentUid, sections, subjects } from '$lib/stores';
	import { selectedSection, selectedSubject, selectedUid, students } from '$lib/stores/admin';
	import {
		CalendarCheck2,
		FileText,
		GanttChart,
		Home,
		LayoutDashboard,
		LogOut,
		Menu,
		Users2
	} from '@lucide/svelte';
	import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	let section = $state('');
	let subject = $state('');
	let checked = $state(false);

	let sectionUids = $derived($sections.map((s) => s.uid ?? ''));
	let subjectUids = $derived($subjects.map((s) => s.uid ?? ''));

	$effect(() => {
		selectedUid.set(data.userSession.uid);
	});
	$effect(() => {
		if (section) selectedSection.set(section);
	});
	$effect(() => {
		if (subject) selectedSubject.set(subject);
	});
	$effect(() => {
		if (!section) section = $currentSchedule?.section ?? $sections.at(0)?.uid ?? 'All';
	});
	$effect(() => {
		if (!subject) subject = $currentSchedule?.subject ?? $subjects.at(0)?.uid ?? '';
	});

	onMount(() => {
		const cleanup = onSnapshot(query(collection(db, 'students'), orderBy('lastname')), (ss) => {
			students.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id }) as Student));
		});

		return () => {
			cleanup();
		};
	});

	async function onSignOut() {
		currentUid.set(null);
		await signOut();
		goto('/');
	}
</script>

<div class="drawer min-h-[100dvh] lg:drawer-open">
	<input id="admin-drawer" bind:checked type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<div class="navbar w-full max-w-[100dvw] border-b border-base-content bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="admin-drawer" class="btn btn-square btn-ghost">
					<Menu />
				</label>
			</div>
			<AdminNav />
		</div>
		<div class="flex-1">
			{@render children?.()}
		</div>
		<div class="sticky bottom-0 flex gap-4 bg-base-300 p-4">
			<Select label="Section" bind:value={section} items={['All', ...sectionUids]} />
			<!-- <Select label="Section" bind:value={section} items={sectionUids} /> -->
			<Select label="Subject" bind:value={subject} items={subjectUids} />
		</div>
	</div>
	<div class="drawer-side">
		<label for="admin-drawer" class="drawer-overlay"></label>
		<div class="flex min-h-full w-80 flex-col bg-base-200">
			<div class="flex w-full items-center justify-center bg-gradient-to-br from-primary to-accent">
				<div class="flex h-full flex-col items-center justify-center gap-2 p-8">
					<Avatar student={$currentStudent} size="2xl" outline="accent" />
					<p class="md text-center text-lg">{data.userSession.email}</p>
					<button class="btn btn-outline" onclick={onSignOut}>
						<LogOut size={18} /> Sign out
					</button>
				</div>
			</div>
			<ul class="flex flex-1 flex-col p-4">
				<NavListTile bind:checked title="Dashboard" to="/admin">
					{#snippet icon()}
						<LayoutDashboard size={22} />
					{/snippet}
				</NavListTile>
				<div class="divider"></div>
				<NavListTile bind:checked title="Students" to="/admin/students">
					{#snippet icon()}
						<Users2 size={22} />
					{/snippet}
				</NavListTile>
				<NavListTile bind:checked title="Sections" to="/admin/sections">
					{#snippet icon()}
						<GanttChart size={22} />
					{/snippet}
				</NavListTile>
				<NavListTile bind:checked title="Subjects" to="/admin/subjects">
					{#snippet icon()}
						<FileText size={22} />
					{/snippet}
				</NavListTile>
				<NavListTile bind:checked title="Schedules" to="/admin/schedules">
					{#snippet icon()}
						<CalendarCheck2 size={22} />
					{/snippet}
				</NavListTile>
				<div class="flex-1"></div>
				<div class="divider"></div>
				<NavListTile bind:checked title="Home" to="/">
					{#snippet icon()}
						<Home size={22} />
					{/snippet}
				</NavListTile>
			</ul>
		</div>
	</div>
</div>
