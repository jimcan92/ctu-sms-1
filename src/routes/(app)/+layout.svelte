<script lang="ts">
	import { page } from '$app/state';
	import { Theme } from '$lib/components';
	import Avatar from '$lib/components/Avatar.svelte';
	import ThemeSelect from '$lib/components/ThemeSelect.svelte';
	import { cn } from '$lib/cutils.js';
	import { currentStudent } from '$lib/stores';
	import { Folders, UserCog2 } from '@lucide/svelte';

	let { data, children } = $props();

	let isAdmin = $derived(data.userSession?.admin);
</script>

<div class="flex min-h-[100dvh] flex-col">
	<div class="flex w-full"></div>
	<div class="border-base-content bg-base-200 flex w-full justify-center border-b">
		<div class="navbar max-w-screen-xl">
			<div class="navbar-start">
				<a
					class={cn('btn btn-ghost text-xl normal-case hover:bg-transparent', {
						'btn-active': page.url.pathname === '/'
					})}
					href="/">CTU SMS</a
				>
			</div>
			<div class="navbar-end gap-4 pr-2 sm:pr-6 xl:pr-0">
				<ThemeSelect />
				<a
					href="/files"
					class={cn('btn btn-circle btn-ghost btn-outline', {
						'btn-active': page.url.pathname === '/files'
					})}
				>
					<Folders />
				</a>
				<Theme />
				{#if isAdmin}
					<a href="/admin" class="btn btn-circle btn-ghost btn-outline">
						<UserCog2 />
					</a>
				{/if}
				<a href="/auth" class="btn btn-circle btn-ghost">
					<Avatar student={$currentStudent} outline="accent" />
				</a>
			</div>
		</div>
	</div>
	{@render children?.()}
</div>
