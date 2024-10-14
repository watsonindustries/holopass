import { PUBLIC_SITE_URL } from '$env/static/public';
import HolopassSocialThumb from '$lib/assets/images/holopass-social-thumb.png';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const socialThumbImgURL = new URL(HolopassSocialThumb, PUBLIC_SITE_URL).toString();

	return { session: await getSession(), socialThumbImgURL };
};
