<script lang="ts">
	interface Props {
		when?: boolean;
		children?: import('svelte').Snippet;
	}

	let { when = false, children }: Props = $props();
</script>

{#if when}
	{@render children?.()}
{/if}
