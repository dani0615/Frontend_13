import { useState, useCallback } from 'react';
import { apiClient } from '../services/apiConfig';

export const useRanking = () => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRanking = useCallback(async (type = 'all_time', count = 20) => {
        setLoading(true);
        setError(null);

        // Mock Logic
        if (import.meta.env.VITE_USE_MOCK_API === 'true') {
            await new Promise(resolve => setTimeout(resolve, 800));
            const mockData = [
                { rank: 1, userName: 'Tóth Gábor', partyCount: 42, score: 8400 },
                { rank: 2, userName: 'Kovács Anna', partyCount: 38, score: 7600 },
                { rank: 3, userName: 'Szabó Péter', partyCount: 35, score: 7000 },
                { rank: 4, userName: 'Nagy Zoltán', partyCount: 29, score: 5800 },
                { rank: 5, userName: 'Kiss Dóra', partyCount: 25, score: 5000 }
            ];

            const formattedRanking = mockData.map(user => ({
                rank: user.rank,
                username: user.userName,
                events: user.partyCount,
                points: user.score
            }));

            setRanking(formattedRanking);
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.get(`/api/Ranking/TopList`, {
                params: { type, count }
            });

            const formattedRanking = response.data.map(user => ({
                rank: user.rank,
                username: user.userName,
                events: user.partyCount,
                points: user.score
            }));

            setRanking(formattedRanking);
        } catch (err) {
            console.error('Error fetching ranking:', err);
            setError(err.response?.data || 'Nem sikerült betölteni a ranglistát.');
        } finally {
            setLoading(false);
        }
    }, []);

    return { ranking, loading, error, fetchRanking };
};
