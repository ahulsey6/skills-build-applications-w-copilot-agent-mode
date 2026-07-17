import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.teams ?? payload.results ?? [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.name}>
            <strong>{team.name}</strong> — {team.focus} ({team.members?.join(', ') || 'No members'})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
