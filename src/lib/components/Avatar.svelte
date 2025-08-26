<script lang="ts">
	import { cn, getInitials } from '$lib/cutils.js';
	import { User2 } from '@lucide/svelte';

	interface Props {
		student: Student | undefined | null;
		outline?: 'accent' | 'primary' | 'warning' | 'error' | 'info' | 'base' | 'success' | undefined;
		classes?: string | undefined;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
	}

	let { student, outline = undefined, classes = undefined, size = 'md' }: Props = $props();

	let cls = cn(classes, 'rounded-full', {
		'ring-accent': outline === 'accent',
		'ring-primary': outline === 'primary',
		'ring-warning': outline === 'warning',
		'ring-error': outline === 'error',
		'ring-info': outline === 'info',
		'ring-base': outline === 'base',
		'ring-success': outline === 'success',
		ring: !!outline,
		'w-6': size === 'xs',
		'w-8': size === 'sm',
		'w-10': size === 'md',
		'w-12': size === 'lg',
		'w-16': size === 'xl',
		'w-20': size === '2xl',
		'w-28': size === '4xl'
	});
</script>

{#if student?.photoUrl}
	<div class="avatar">
		<div class={cls}>
			<img src={student?.photoUrl} alt="" />
		</div>
	</div>
{:else}
	<div class="placeholder avatar">
		<div class={cls}>
			{#if student}
				<span class="text-lg font-semibold">
					{getInitials(`${student.firstname} ${student.lastname}`) ?? 'NN'}
				</span>
			{:else}
				<User2 />
			{/if}
		</div>
	</div>
{/if}
