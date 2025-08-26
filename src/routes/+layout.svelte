<script lang="ts">
	import { browser } from '$app/environment';
	import { db } from '$lib/services/client';
	import { attendance, currentUid, scores } from '$lib/stores';
	import { collection, onSnapshot, query, where } from 'firebase/firestore';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { data, children }: Props = $props();

	let session = $derived(data.userSession);
	$effect(() => {
		currentUid.set(session?.uid);
	});

	onMount(() => {
		if (browser && $currentUid) {
			onSnapshot(query(collection(db, 'attendance'), where('owner', '==', $currentUid)), (ss) => {
				attendance.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id }) as Attendance));
			});

			onSnapshot(query(collection(db, 'scores'), where('owner', '==', $currentUid)), (ss) => {
				scores.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id }) as Score));
			});
		}
	});
</script>

<ModeWatcher />
{@render children?.()}
