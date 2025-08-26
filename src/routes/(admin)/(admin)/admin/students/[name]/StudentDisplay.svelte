<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn, toName } from '$lib/cutils';
	import { selectedStudent, selectedUid, studentsBySection } from '$lib/stores/admin';
	import { SkipBack, SkipForward } from '@lucide/svelte';

	let cs = $derived($selectedStudent);
	let ci = $derived(cs?.index);
	let ps = $derived(ci && ci > 0 ? $studentsBySection.at(ci - 1) : undefined);
	let ns = $derived(
		typeof ci !== 'undefined' && ci < $studentsBySection.length - 1
			? $studentsBySection.at(ci + 1)
			: undefined
	);

	function onPrev() {
		if (ps) {
			selectedUid.set(ps.uid);
			goto(`/admin/students/${toName(ps?.firstname ?? '', ps?.lastname ?? '')}`);
		}
	}

	function onNext() {
		if (ns) {
			selectedUid.set(ns.uid);
			goto(`/admin/students/${toName(ns?.firstname ?? '', ns?.lastname ?? '')}`);
		}
	}
</script>

<div class="avatar mt-4">
	<div class="w-64 rounded">
		<img src={cs?.value?.photoUrl} alt="" />
	</div>
</div>
<div
	class={cn(
		'flex items-center',
		'bg-base-100',
		'mb-2 w-full max-w-sm gap-2 p-2',
		'border-base-200 rounded-2xl border',
		'hover:drop-shadow-[0_0_4px_#3d98ff]'
	)}
>
	<button disabled={!ps} class="btn" onclick={onPrev}><SkipBack /></button>
	<div class="bg-base-200 flex h-full w-full items-center justify-center rounded-lg">
		<h1 class="text-xl font-semibold">
			{toName(cs?.value?.firstname ?? '', cs?.value?.lastname ?? '')}
		</h1>
	</div>
	<button disabled={!ns} class="btn" onclick={onNext}><SkipForward /></button>
</div>
