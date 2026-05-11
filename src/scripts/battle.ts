interface ContributionDay {
	count: number;
	date?: string;
	weekday?: number;
	level: number;
}

interface ContributionWeek {
	first_day?: string;
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

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;
const fallbackColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const player1Input = document.querySelector<HTMLInputElement>('#player1');
const player2Input = document.querySelector<HTMLInputElement>('#player2');
const battleButton = document.querySelector<HTMLButtonElement>('#battleButton');
const statusMessage = document.querySelector<HTMLElement>('#statusMessage');
const results = document.querySelector<HTMLElement>('#results');
const winnerBanner = document.querySelector<HTMLElement>('#winnerBanner');

const setStatus = (message: string, type: StatusType = 'default') => {
	if (!statusMessage) {
		return;
	}

	statusMessage.textContent = message;
	statusMessage.className = type === 'default' ? 'status' : `status ${type}`;
};

const shakeElement = (el: HTMLElement) => {
	el.classList.remove('shake');
	void el.offsetWidth; // force reflow to restart animation
	el.classList.add('shake');
	el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
};

const setInputError = (input: HTMLInputElement, hasError: boolean) => {
	if (hasError) {
		input.classList.add('error');
		input.setAttribute('aria-invalid', 'true');
	} else {
		input.classList.remove('error');
		input.removeAttribute('aria-invalid');
	}
};

const renderWinnerBanner = (
	player1: string,
	player2: string,
	player1Data: ContributionResponse,
	player2Data: ContributionResponse,
) => {
	if (!winnerBanner) return;

	winnerBanner.innerHTML = '';
	const banner = document.createElement('div');

	if (player1Data.total_contributions > player2Data.total_contributions) {
		banner.className = 'winner-banner winner';
		banner.textContent = `🏆 ${player1} WINS! 🏆`;
	} else if (player2Data.total_contributions > player1Data.total_contributions) {
		banner.className = 'winner-banner winner';
		banner.textContent = `🏆 ${player2} WINS! 🏆`;
	} else {
		banner.className = 'winner-banner tie';
		banner.textContent = `🤝 IT'S A TIE! 🤝`;
	}

	winnerBanner.append(banner);
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
			const dayDate = getDayDate(day, week);
			const tooltip = `${dayDate}: ${day.count} contributions`;
			square.style.backgroundColor = colors[colorIndex] ?? colors[0];
			square.title = tooltip;
			square.dataset.tooltip = tooltip;
			square.setAttribute('aria-label', tooltip);
			square.tabIndex = 0;
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
		(day.date === undefined || typeof day.date === 'string') &&
		(day.weekday === undefined || typeof day.weekday === 'number') &&
		typeof day.level === 'number'
	);
};

const isContributionWeek = (week: unknown): week is ContributionWeek => {
	return (
		isObjectRecord(week) &&
		(week.first_day === undefined || typeof week.first_day === 'string') &&
		Array.isArray(week.contribution_days) &&
		week.contribution_days.every(isContributionDay)
	);
};

const getDayDate = (day: ContributionDay, week: ContributionWeek): string => {
	if (typeof day.date === 'string') {
		return day.date;
	}

	if (typeof week.first_day === 'string' && typeof day.weekday === 'number') {
		const baseDate = new Date(`${week.first_day}T00:00:00Z`);
		if (!Number.isNaN(baseDate.getTime())) {
			baseDate.setUTCDate(baseDate.getUTCDate() + day.weekday);
			return baseDate.toISOString().slice(0, 10);
		}
	}

	return 'Unknown date';
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
	if (winnerBanner) winnerBanner.innerHTML = '';

	// Per-field validation with specific error messages
	const p1Empty = !player1;
	const p2Empty = !player2;

	if (p1Empty && p2Empty) {
		setInputError(player1Input, true);
		setInputError(player2Input, true);
		shakeElement(player1Input);
		shakeElement(player2Input);
		setStatus('Enter both player usernames to battle!', 'error');
		if (statusMessage) shakeElement(statusMessage);
		player1Input.focus();
		return;
	}

	if (p1Empty) {
		setInputError(player1Input, true);
		shakeElement(player1Input);
		setStatus('Enter a username for Player 1.', 'error');
		if (statusMessage) shakeElement(statusMessage);
		player1Input.focus();
		return;
	}

	if (p2Empty) {
		setInputError(player2Input, true);
		shakeElement(player2Input);
		setStatus('Enter a username for Player 2.', 'error');
		if (statusMessage) shakeElement(statusMessage);
		player2Input.focus();
		return;
	}

	if (!USERNAME_REGEX.test(player1)) {
		setInputError(player1Input, true);
		shakeElement(player1Input);
		setStatus(`"${player1}" is not a valid GitHub username.`, 'error');
		if (statusMessage) shakeElement(statusMessage);
		player1Input.focus();
		return;
	}

	if (!USERNAME_REGEX.test(player2)) {
		setInputError(player2Input, true);
		shakeElement(player2Input);
		setStatus(`"${player2}" is not a valid GitHub username.`, 'error');
		if (statusMessage) shakeElement(statusMessage);
		player2Input.focus();
		return;
	}

	setInputError(player1Input, false);
	setInputError(player2Input, false);
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
		renderWinnerBanner(player1, player2, player1Data, player2Data);
		setStatus('Battle ready!');
	} catch (error) {
		setStatus(error instanceof Error ? error.message : 'Unexpected battle error.', 'error');
		if (statusMessage) shakeElement(statusMessage);
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
player1Input?.addEventListener('input', () => { if (player1Input) setInputError(player1Input, false); });
player2Input?.addEventListener('input', () => { if (player2Input) setInputError(player2Input, false); });