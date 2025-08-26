import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	if (userSession) redirect(301, `/auth/${userSession.uid}`);

	redirect(303, '/auth/signin');
}) satisfies PageServerLoad;
