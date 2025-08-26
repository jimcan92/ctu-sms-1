import { browser } from '$app/environment';
import { PUBLIC_FIREBASE_CLIENT_CONFIG } from '$env/static/public';
import { initFirebase } from '$lib/services/client';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data: { userSession } }) => {
	if (browser) {
		initFirebase(JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG));
	}

	return { userSession };
};
