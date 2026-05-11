interface ContributionDay {
	count: number;
	date: string;
	level: number;
}

interface ContributionWeek {
	contribution_days: ContributionDay[];
}

interface ContributionResponse {
	from: string;
	to: string;
	total_contributions: number;
	colors_full?: string[];
	weeks: ContributionWeek[];
}

type StatusType = 'default' | 'error' | 'loading';

const fallbackColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const player1Input = document.querySelector<HTMLInputElement>('#player1');
const player2Input = document.querySelector<HTMLInputElement>('#player2');
const battleButton = document.querySelector<HTMLButtonElement>('#battleButton');
const statusMessage = document.querySelector<HTMLElement>('#statusMessage');
const results = document.querySelector<HTMLElement>('#results');

const setStatus = (message: string, type: StatusType = 'default') => {
	if (!statusMessage) {
		return;
	}

	statusMessage.textContent = message;
	statusMessage.className = type === 'default' ? 'status' : `status ${type}`;
};

const renderPlayerCard = (username: string, data: ContributionResponse) => {
	const card = document.createElement('article');
	card.className = 'player-card';

	const title = document.createElement('h2');
	title.textContent = username;
	card.append(title);

	const total = document.createElement('p');
	total.className = 'player-meta';
	total.textContent = `Total contributions: ${data.total_contributions}`;
	card.append(total);

	const range = document.createElement('p');
	range.className = 'player-meta';
	range.textContent = `Range: ${data.from} to ${data.to}`;
	card.append(range);

	const grid = document.createElement('div');
	grid.className = 'contribution-grid';

	const colors = data.colors_full && data.colors_full.length > 0 ? data.colors_full : fallbackColors;
	for (const week of data.weeks) {
		for (const day of week.contribution_days) {
			const square = document.createElement('div');
			square.className = 'day-square';
			const colorIndex = Math.max(0, Math.min(day.level, colors.length - 1));
			square.style.backgroundColor = colors[colorIndex] ?? colors[0];
			square.title = `${day.date}: ${day.count} contributions`;
			grid.append(square);
		}
	}

	card.append(grid);
	return card;
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null;
};

const isErrorResponse = (value: unknown): value is { error: string } => {
	return isObjectRecord(value) && typeof value.error === 'string';
};

const isContributionDay = (day: unknown): day is ContributionDay => {
	return (
		isObjectRecord(day) &&
		typeof day.count === 'number' &&
		typeof day.date === 'string' &&
		typeof day.level === 'number'
	);
};

const isContributionWeek = (week: unknown): week is ContributionWeek => {
	return (
		isObjectRecord(week) &&
		Array.isArray(week.contribution_days) &&
		week.contribution_days.every(isContributionDay)
	);
};

const isContributionResponse = (value: unknown): value is ContributionResponse => {
	return (
		isObjectRecord(value) &&
		typeof value.from === 'string' &&
		typeof value.to === 'string' &&
		typeof value.total_contributions === 'number' &&
		Array.isArray(value.weeks) &&
		value.weeks.every(isContributionWeek)
	);
};

const fetchContributions = async (username: string): Promise<ContributionResponse> => {
	const response = await fetch(`/api/contributions/${encodeURIComponent(username)}`);
	const data: unknown = await response.json();

	if (!response.ok) {
		throw new Error(isErrorResponse(data) ? data.error : 'Failed to fetch contribution data');
	}

	if (!isContributionResponse(data)) {
		if (isErrorResponse(data)) {
			throw new Error(data.error);
		}

		throw new Error('Invalid contribution response');
	}

	return data;
};

const handleBattleSubmit = async () => {
	if (!player1Input || !player2Input || !battleButton || !results) {
		return;
	}

	const player1 = player1Input.value.trim();
	const player2 = player2Input.value.trim();
	results.innerHTML = '';

	if (!player1 || !player2) {
		setStatus('Please enter usernames for both players.', 'error');
		return;
	}

	setStatus('Loading contribution data...', 'loading');
	battleButton.disabled = true;

	try {
		const [player1Data, player2Data] = await Promise.all([
			fetchContributions(player1),
			fetchContributions(player2),
		]);

		results.append(renderPlayerCard(player1, player1Data));

		const vs = document.createElement('div');
		vs.className = 'vs-badge';
		vs.textContent = 'VS';
		results.append(vs);

		results.append(renderPlayerCard(player2, player2Data));
		setStatus('Battle ready!');
	} catch (error) {
		setStatus(error instanceof Error ? error.message : 'Unexpected battle error.', 'error');
	} finally {
		battleButton.disabled = false;
	}
};

const handleInputKeydown = (event: KeyboardEvent) => {
	if (event.key !== 'Enter') {
		return;
	}

	event.preventDefault();
	void handleBattleSubmit();
};

battleButton?.addEventListener('click', handleBattleSubmit);
player1Input?.addEventListener('keydown', handleInputKeydown);
player2Input?.addEventListener('keydown', handleInputKeydown);