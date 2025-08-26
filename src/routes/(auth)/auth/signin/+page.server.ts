import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	if (userSession) redirect(300, '/');
	return { userSession };
}) satisfies PageServerLoad;
