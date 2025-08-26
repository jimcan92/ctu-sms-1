import { fromName } from '$lib/cutils';
import { decodeToken, exists, saveAsAdmin } from '$lib/services/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') || '';
	const { decodedToken } = await decodeToken(token);

	console.log(decodedToken);


	if (decodedToken) {
		const { uid, name, email, picture } = decodedToken;
		event.locals.userSession = {
			uid,
			name,
			email,
			admin: email === 'jimcan051592@gmail.com'
		};

		if (!(await exists('students', uid))) {
			const { fname, lname } = fromName(name);
			await saveAsAdmin<Partial<Student>>('students', uid, {
				firstname: fname,
				lastname: lname,
				photoUrl: picture
			});
		}
	}

	return await resolve(event);
};
