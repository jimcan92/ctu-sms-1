<script lang="ts">
	import Confirm from './Confirm.svelte';

	import { page } from '$app/state';
	import { isValid } from '$lib/cutils';
	import { AlertTriangle, ChevronsLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const code = page.params.code;
	const subject = page.url.searchParams.get('subject');
	const uid = page.url.searchParams.get('uid');

	let valid = $state(false);

	onMount(async () => (valid = await isValid(code ?? '')));
</script>

<div class="flex min-h-[100dvh] items-center justify-center p-4">
	<div class="flex min-w-[200px] flex-col gap-4">
		{#if valid && uid && subject}
			<Confirm {uid} {subject} />
		{:else}
			<div class="text-warning flex gap-2 italic">
				<AlertTriangle />
				<p class="">The QR Code is invalid!</p>
			</div>
		{/if}
		<a href={page.url.origin} class="btn"><ChevronsLeft size={18} /> Back</a>
	</div>
</div>
