import { dev } from '$app/environment';
import { PROD_DOMAIN } from './const';

export function isDaniru(profileId: string): boolean {
	return false;
	return profileId === '33e4a9c6-f4f8-4c7b-acd4-8f343e1561a5';
}

export function profileRedirectURL(profileId: string): string {
	const baseURL = dev ? 'http://localhost:5173' : PROD_DOMAIN;
	const redirectURL = `${baseURL}/pass/${profileId}`;
	return redirectURL;
}

export function discordAvatarURLtoStoragePath(url: string): string {
	const fileName = url.split('/').pop();
	return fileName || '';
}
