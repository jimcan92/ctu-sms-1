import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	if (!userSession) redirect(303, '/auth');

	return { userSession };
}) satisfies PageServerLoad;
