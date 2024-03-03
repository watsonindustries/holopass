import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals, params }) => {
	const { getSession, supabase } = locals;
	const session = getSession();

	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const payload = await request.json();
	const { profile } = payload;
	const { id: pass_id } = params;

	const { error } = await supabase
		.from('profiles')
		.update({ following_ids: [...profile.following_ids, pass_id] })
		.eq('id', profile.id)
		.select();

	if (error) {
		return new Response('Error', { status: 500 });
	}

	return new Response('OK');
};
