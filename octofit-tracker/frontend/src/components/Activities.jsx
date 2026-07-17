import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.activities ?? payload.results ?? [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || `${activity.userName}-${activity.type}`}>
            <strong>{activity.userName}</strong> — {activity.type} ({activity.durationMinutes} min, {activity.calories} cal)
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
