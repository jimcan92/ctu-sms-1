import type { FirebaseError as FirebaseAdminError } from 'firebase-admin/app';
import type { FirebaseError } from 'firebase/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(e: any): AppError {
	if ((e as FirebaseError) || (e as FirebaseAdminError))
		return { message: e.message, code: e.code };
	return { message: e.toString() };
}
