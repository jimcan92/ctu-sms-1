<script lang="ts">
	import { Avatar } from '$lib/components';
	import Combobox from '$lib/components/Combobox.svelte';
	import { Button } from '$lib/components/ui/button';
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { signOut, updateDocument } from '$lib/services/client';
	import { currentStudent, currentUid, sections, subjects } from '$lib/stores';
	import { Baseline, Hash, LogOut, PenSquare, Save, X } from '@lucide/svelte';
	import type { ChangeEventHandler } from 'svelte/elements';
	import UpdateAvatar from './UpdateAvatar.svelte';

	let { data } = $props();

	let subjectCodes: string[] = $state([]);
	let editing = $state(false);
	let fname = $state('');
	let lname = $state('');
	let idNumber = $state('');
	let sectionCode = $state('');

	let busy = $state(false);

	const setInitialValues = () => {
		fname = student?.firstname ?? '';
		lname = student?.lastname ?? '';
		idNumber = student?.idNumber?.toString() ?? '';
		sectionCode = student?.sectionCode ?? '';
		subjectCodes = student?.subjectCodes ?? [];
	};

	const handleSubmit = async () => {
		busy = true;

		await updateDocument<Student>('students', data.userSession.uid, {
			firstname: fname,
			lastname: lname,
			idNumber: Number(idNumber),
			sectionCode,
			subjectCodes
		});

		busy = false;

		editing = false;
	};

	const handleSubjectSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.currentTarget.checked) {
			subjectCodes.push(e.currentTarget.value);
		} else {
			subjectCodes = subjectCodes.filter((sc) => sc !== e.currentTarget.value);
		}
	};

	async function onSignOut() {
		busy = true;
		currentUid.set(null);
		await signOut();
		busy = false;
	}
	let secs = $derived($sections.map((s) => s.uid ?? ''));
	let subs = $derived($subjects);
	$effect(() => {
		if (busy) {
			editing = false;
		}
	});
	let student = $derived($currentStudent);
	$effect(() => {
		if (student) setInitialValues();
	});
</script>

<main class="flex min-h-screen items-center justify-center p-4">
	<div
		class="grid max-w-sm shadow-lg hover:drop-shadow-[0_0_4px_#3d98ff] md:max-w-none md:grid-cols-2"
	>
		<div
			class="flex flex-col items-center rounded-none rounded-t-lg bg-gradient-to-br from-primary to-accent md:rounded-none md:rounded-l-lg"
		>
			<div class="flex h-full flex-col items-center justify-center gap-2 p-8">
				<div class="relative flex">
					<Avatar {student} size="4xl" outline="accent" />
					<UpdateAvatar
						photoUrl={student?.photoUrl}
						imgName="{fname} {lname}"
						section={sectionCode}
					/>
				</div>
				<p class="md text-center text-lg">{data.userSession.email}</p>
				<button class="btn btn-outline" onclick={onSignOut}><LogOut size={18} /> Sign out</button>
			</div>
		</div>
		<div
			class="md:p8 bg-base-300 flex h-full flex-col items-center justify-center rounded-none rounded-b-lg p-4 md:rounded-none md:rounded-r-lg"
		>
			<form class="flex w-full flex-col items-center">
				<fieldset class="fieldset w-full">
					<label for="idNumber" class="label">ID Number</label>
					<!-- <Input
						id="idNumber"
						icon={Hash}
						disabled={!editing}
						bind:value={idNumber}
						label="ID Number"
					/>
					<label for="fname" class="label">First Name</label>
					<Input
						id="fname"
						icon={Baseline}
						disabled={!editing}
						bind:value={fname}
						label="First Name"
					/>
					<label for="lname" class="label">Last Name</label>
					<Input
						id="lname"
						icon={Baseline}
						disabled={!editing}
						bind:value={lname}
						label="Last Name"
					/> -->
					<label for="sectionCode" class="label">Last Name</label>
					<Combobox />
					<!-- @migration-task: migrate this slot by hand, `prefix-icon` is an invalid identifier -->
				</fieldset>
				<LabeledInput disabled={!editing} bind:value={idNumber} label="ID Number">
					<!-- @migration-task: migrate this slot by hand, `prefix-icon` is an invalid identifier -->
					<Hash slot="prefix-icon" size={18} />
				</LabeledInput>
				<LabeledInput disabled={!editing} bind:value={fname} label="First Name">
					<!-- @migration-task: migrate this slot by hand, `prefix-icon` is an invalid identifier -->
					<Baseline slot="prefix-icon" size={18} />
				</LabeledInput>
				<LabeledInput disabled={!editing} bind:value={lname} label="Last Name">
					<!-- @migration-task: migrate this slot by hand, `prefix-icon` is an invalid identifier -->
					<Baseline slot="prefix-icon" size={18} />
				</LabeledInput>
				<div class="form-control">
					<p class="label">Subjects</p>
					<div class={`rounded-lg px-4 w-full${editing ? ' bg-base-100' : ' bg-base-200'}`}>
						{#each subs as subject}
							<div class="flex">
								<input
									type="checkbox"
									disabled={!editing}
									checked={subjectCodes.includes(subject.uid ?? '')}
									value={subject.uid}
									class="checkbox checkbox-sm mt-4"
									onchange={handleSubjectSelect}
								/>
								<div class="collapse-arrow collapse rounded-md">
									<input type="checkbox" />
									<div class="collapse-title">{subject.uid}</div>
									<div class="collapse-content">
										<p>{subject.title}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="divider"></div>
				<div class="flex w-full justify-evenly gap-4">
					<!-- <a href="/" class="btn btn-ghost btn-sm sm:btn-md" onclick={() => (editing = !editing)}>
						<ChevronsLeft size={18} /> Home
					</a> -->
					<Button
						variant="ghost"
						size="md"
						class="w-full sm:w-auto"
						onclick={() => {
							if (editing) setInitialValues();
							editing = !editing;
						}}
					>
						{#if editing}
							<X size={18} /> Cancel
						{:else}
							<PenSquare size={18} /> Update
						{/if}
					</Button>

					<button
						type="button"
						class="btn btn-ghost btn-sm sm:btn-md"
						onclick={() => {
							if (editing) setInitialValues();
							editing = !editing;
						}}
					>
						{#if editing}
							<X size={18} /> Cancel
						{:else}
							<PenSquare size={18} /> Update
						{/if}
					</button>
					<button
						class="btn btn-sm btn-accent sm:btn-md"
						disabled={!editing}
						onclick={handleSubmit}
					>
						{#if busy}
							<Save size={18} /> Saving <span class="loading loading-sm loading-dots"></span>
						{:else}
							<Save size={18} /> Save
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</main>
