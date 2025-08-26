<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

	interface Props {
		title: string;
		to: string;
		checked: any;
		icon?: import('svelte').Snippet;
	}

	let { title, to, checked = $bindable(), icon }: Props = $props();

	const closeDrawer = () => (checked = false);
</script>

<li>
	<a
		href={to}
		onclick={closeDrawer}
		class="btn flex w-full items-center justify-between capitalize btn-ghost"
	>
		<span class="flex items-center gap-2">
			{@render icon?.()}
			{title}
		</span>
		<ChevronRight size={18} />
	</a>
</li>
