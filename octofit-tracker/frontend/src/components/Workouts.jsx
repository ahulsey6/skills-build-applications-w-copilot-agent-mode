import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.workouts ?? payload.results ?? [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.name}>
            <strong>{workout.name}</strong> — {workout.category} ({workout.durationMinutes} min, {workout.difficulty})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
