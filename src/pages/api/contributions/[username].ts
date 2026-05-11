import type { APIRoute } from 'astro';

export const prerender = false;

const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const CACHE_SECONDS = 300;

export const GET: APIRoute = async ({ params }) => {
	const username = params.username?.trim();

	if (!username || !USERNAME_PATTERN.test(username)) {
		return new Response(JSON.stringify({ error: 'Invalid GitHub username' }), {
			status: 400,
			headers: JSON_HEADERS,
		});
	}

	try {
		const response = await fetch(`https://github.com/${username}.contribs`, {
			headers: {
				Accept: 'application/json',
				'User-Agent': 'mona-mayhem',
			},
		});

		if (!response.ok) {
			const status = response.status === 404 ? 404 : 502;
			const error = response.status === 404 ? 'GitHub user not found' : 'Failed to fetch contribution data';

			return new Response(JSON.stringify({ error }), {
				status,
				headers: JSON_HEADERS,
			});
		}

		const data: unknown = await response.json();

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				...JSON_HEADERS,
				'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, max-age=${CACHE_SECONDS}`,
			},
		});
	} catch {
		return new Response(JSON.stringify({ error: 'Unexpected error fetching contribution data' }), {
			status: 500,
			headers: JSON_HEADERS,
		});
	}
};
