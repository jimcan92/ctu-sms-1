<script lang="ts">
	import { page } from '$app/state';
	import { Folder, FolderOpen } from '@lucide/svelte';

	let paths = $derived(page.url.pathname.split('/').filter((pn) => pn.length > 0));
</script>

<div class="breadcrumbs px-2">
	<ul>
		{#each paths as path, i}
			{@const p = paths.slice(0, paths.indexOf(path) + 1).join('/')}
			<li>
				{#if paths.length === i + 1}
					<span class="flex items-center gap-2 capitalize">
						<FolderOpen size={18} />
						{decodeURI(path)}
					</span>
				{:else}
					<a href={`/${p}`} class="flex items-center gap-2 capitalize">
						<Folder size={18} />
						{decodeURI(path)}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>
