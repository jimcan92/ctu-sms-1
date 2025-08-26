<script lang="ts">
	interface Props {
		linkId: string;
	}

	let { linkId = $bindable() }: Props = $props();
</script>

<iframe
	class="rounded-lg"
	src="https://www.youtube.com/embed/{linkId}"
	title="The History of Computing"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
></iframe>
