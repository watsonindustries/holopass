import { PROD_DOMAIN } from './../const';
import type { LayoutServerLoad } from './$types';
import HolopassSocialThumb from '$lib/assets/images/holopass-social-thumb.png';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const socialThumbImgURL = new URL(HolopassSocialThumb, PROD_DOMAIN).toString();

	return { session: await getSession(), socialThumbImgURL };
};
