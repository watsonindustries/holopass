import { WHITELISTED_DOMAINS, YT_DOMAINS } from './const';

export const htmlifyLinks = (input: string): string => {
	const urlPattern = /\bhttps?:\/\/[\w.-]+\.\w+[/\w.-]*\w(\?\w+=\w+(&\w+=\w+)*)?/g;
	return input.replace(urlPattern, (url) => {
		return `<a href="${wrapForeignLinks(url)}" class="link link-primary">${linkDisplay(url)}</a>`;
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

const linkDisplay = (url: string) => {
	const { hostname, pathname, searchParams } = new URL(url);

	if (YT_DOMAINS.includes(hostname)) {
		const v = searchParams.get('v');
		return `${hostname}${pathname}?v=${v}`;
	}

	return `${hostname}${pathname === '/' ? '' : pathname}`;
};
