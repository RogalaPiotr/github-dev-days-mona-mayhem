import type { APIRoute } from 'astro';

export const prerender = false;

const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const BROWSER_CACHE_SECONDS = 300;
const SHARED_CACHE_SECONDS = 3600;
const CONTACT_URL = import.meta.env.SITE ?? 'https://github.com/RogalaPiotr/github-dev-days-mona-mayhem';
const USER_AGENT = `mona-mayhem/0.0.1 (+${CONTACT_URL})`;

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
				'User-Agent': USER_AGENT,
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

		let data: unknown;
		try {
			data = await response.json();
		} catch (error) {
			console.error('Invalid JSON from GitHub contributions endpoint:', error);

			return new Response(JSON.stringify({ error: 'Invalid response from GitHub API' }), {
				status: 502,
				headers: JSON_HEADERS,
			});
		}

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				...JSON_HEADERS,
				'Cache-Control': `public, s-maxage=${SHARED_CACHE_SECONDS}, max-age=${BROWSER_CACHE_SECONDS}`,
			},
		});
	} catch (error) {
		console.error('Error fetching GitHub contributions:', error);

		return new Response(JSON.stringify({ error: 'Unexpected error fetching contribution data' }), {
			status: 500,
			headers: JSON_HEADERS,
		});
	}
};
