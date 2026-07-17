import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.users ?? payload.results ?? [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.email || user.name}>
            <strong>{user.name}</strong> — {user.email} ({user.fitnessLevel || 'unknown'})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
