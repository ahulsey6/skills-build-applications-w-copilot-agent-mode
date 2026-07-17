import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.leaderboard ?? payload.results ?? [];
        setEntries(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.userName}>
            <strong>{entry.userName}</strong> — {entry.totalPoints} pts, streak {entry.streak}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Leaderboard;
