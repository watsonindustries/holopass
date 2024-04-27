import HolopassSocialThumb from '$lib/assets/images/holopass-social-thumb.png';
import type { LayoutServerLoad } from './$types';
import { PROD_DOMAIN } from './../const';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const socialThumbImgURL = new URL(HolopassSocialThumb, PROD_DOMAIN).toString();

	return { session: await getSession(), socialThumbImgURL };
};
