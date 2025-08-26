<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { X } from '@lucide/svelte';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let busy = $state(false);
	let html5Qrcode: Html5Qrcode;
	let from = '/';

	afterNavigate((url) => (from = url.from?.url.pathname ?? '/'));
	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
	}
	async function stop() {
		busy = true;

		await html5Qrcode.stop();
		goto(from);
		busy = false;
	}

	async function onScanSuccess(decodedText: any) {
		const link = `${decodedText}&uid=${page.data.userSession?.uid}`;
		await stop();
		goto(link);
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<main class="flex min-h-[100dvh] items-center justify-center p-4">
	<div class="flex h-full w-full flex-col">
		<reader id="reader"></reader>
		<button onclick={stop} class="btn mt-4">
			{#if busy}
				Stopping <span class="loading loading-md loading-dots"></span>
			{:else}
				<X size={18} />Cancel
			{/if}
		</button>
	</div>
</main>

<style>
</style>
