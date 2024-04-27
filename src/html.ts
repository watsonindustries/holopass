import { WHITELISTED_DOMAINS } from './const';

export const htmlifyLinks = (input: string): string => {
	const urlPattern = /\bhttps?:\/\/[\w.-]+\.\w+[/\w.-]*\w/g;
	return input.replace(urlPattern, (url) => {
		const { hostname, pathname } = new URL(url);
		return `<a href="${wrapForeignLinks(url)}" class="link link-primary">${hostname}${pathname === '/' ? '' : pathname}</a>`;
	});
};

const wrapForeignLinks = (url: string) => {
	let unwrap = false;

	try {
		const urlObj = new URL(url);

		if (!WHITELISTED_DOMAINS.includes(urlObj.hostname)) {
			unwrap = true;
		}
	} catch (error) {
		unwrap = true;
	}

	return unwrap ? `/#` : url;
};
