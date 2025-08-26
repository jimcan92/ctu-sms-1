<script lang="ts">
	// @ts-ignore
	import QRCode from 'qrcode';

	import DatePicker from '$lib/components/DatePicker.svelte';
	import { hash } from '$lib/cutils';
	import { currentSchedule, selectedDate, subjects } from '$lib/stores';

	let qrcode: HTMLImageElement;
	let text: string | undefined = '';

	const generateQR = async (text: string) => {
		try {
			qrcode.src = await QRCode.toDataURL(text);
		} catch (err: any) {
			return err.toString();
		}
	};

	async function generate() {
		const hashedNow = await hash($selectedDate.format('YYYY-MM-DD'));

		text = `/qr-code/${hashedNow}?subject=${subject}`;
		await generateQR(text);
	}
	let subject = $derived($currentSchedule?.subject ?? $subjects.at(0)?.uid);
	$effect(() => {
		generate();
	});
</script>

<div class="flex min-h-[100dvh] items-center justify-center p-4 sm:p-8">
	<div class="flex w-full max-w-lg flex-col items-center gap-4">
		<DatePicker />
		<select
			value={subject}
			class="select-bordered select w-full max-w-xs"
			onchange={(e) => (subject = e.currentTarget.value)}
		>
			{#each $subjects as sub}
				<option value={sub.uid}>{sub.uid}</option>
			{/each}
		</select>

		<img src="" alt="" class="w-full max-w-lg rounded-lg" bind:this={qrcode} />
		<a href="/" class="btn w-full max-w-xs">Back</a>
	</div>
</div>
