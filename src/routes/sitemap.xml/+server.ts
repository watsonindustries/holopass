import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			<!-- <url> elements go here -->
			<url>
				<loc>https://holo-pass.com/</loc>
  		</url>
			<url>
				<loc>https://holo-pass.com/pass/</loc>
  		</url>
			<url>
				<loc>https://holo-pass.com/about</loc>
  		</url>
			<url>
				<loc>https://holo-pass.com/qr</loc>
  		</url>
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
};
