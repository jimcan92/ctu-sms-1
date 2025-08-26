<script lang="ts">
	import { DatePicker } from '$lib/components';
	import { currentStudent } from '$lib/stores';
	import { QrCode, ScanLine } from '@lucide/svelte';
	import AttendanceView from './AttendanceView.svelte';
	import ScoreView from './ScoreView.svelte';

	let { data } = $props();

	let isAdmin = $derived(data.userSession?.admin);
</script>

{#if $currentStudent}
	<div class="flex w-full max-w-screen-xl flex-col gap-4 self-center px-4 pt-8 xl:px-0">
		<DatePicker />
		{#if isAdmin}
			<a href="/qr-code" class="btn w-full max-w-sm self-center"><QrCode size={18} /> QR Codes</a>
		{:else}
			<a href="/qr-scanner" class="btn w-full max-w-sm self-center">
				<ScanLine size={18} />Scan Attendance
			</a>
		{/if}
		<AttendanceView />
		<ScoreView />
	</div>
{:else if data.userSession && $currentStudent !== null}
	<div class="flex flex-1 flex-col items-center justify-center">
		<h3 class="flex items-center gap-2 md:text-xl md:font-semibold">
			Loading data. Please wait
			<span class="loading loading-dots"></span>
		</h3>
	</div>
{:else}
	<div class="flex flex-1 flex-col items-center justify-center">
		<h3 class="text-info md:text-xl md:font-semibold">
			Please <a href="/auth" class="link link-accent link-hover">Sign In</a> to use this System.
		</h3>
	</div>
{/if}
