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

	if (profile.id === pass_id) {
		return new Response('Cannot follow yourself', { status: 400 });
	}

	const { error } = await supabase
		.from('follows')
		.insert({ follower_id: profile.id, followee_id: pass_id });

	if (error) {
		return new Response('Error', { status: 500 });
	}

	return new Response('OK');
};
