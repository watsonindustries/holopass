import { PUBLIC_SITE_URL } from '$env/static/public';

export function isDaniru(profileId: string): boolean {
	return false;
	return profileId === '33e4a9c6-f4f8-4c7b-acd4-8f343e1561a5';
}

export function profileRedirectURL(profileId: string): string {
	const redirectURL = `${PUBLIC_SITE_URL}/pass/${profileId}`;
	return redirectURL;
}

export function discordAvatarURLtoStoragePath(url: string): string {
	const fileName = url.split('/').pop();
	return fileName || '';
}
