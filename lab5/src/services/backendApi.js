const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const buildUrl = (path) => `${API_BASE_URL}${path}`;

const handleJsonResponse = async (response, fallbackMessage) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || fallbackMessage);
    }

    return response.json();
};

export const saveTestResult = async ({ userId, score, testId }) => {
    const response = await fetch(buildUrl('/api/test-results'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, score, testId }),
    });

    return handleJsonResponse(response, 'Failed to save test result');
};

export const fetchAverageScore = async (userId) => {
    if (!userId) {
        return { userId: null, averageScore: 0, totalAttempts: 0 };
    }

    const response = await fetch(
        buildUrl(`/api/test-results/average?userId=${encodeURIComponent(userId)}`)
    );

    return handleJsonResponse(response, 'Failed to fetch average score');
};

export const fetchUserTestResults = async (userId) => {
    if (!userId) {
        return { userId: null, results: [] };
    }

    const response = await fetch(
        buildUrl(`/api/test-results?userId=${encodeURIComponent(userId)}`)
    );

    return handleJsonResponse(response, 'Failed to fetch user test results');
};

export const fetchEvents = async () => {
    const response = await fetch(buildUrl('/api/events'));
    return handleJsonResponse(response, 'Failed to fetch events');
};

export const addEvent = async (eventData) => {
    const response = await fetch(buildUrl('/api/events'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });

    return handleJsonResponse(response, 'Failed to save event');
};
