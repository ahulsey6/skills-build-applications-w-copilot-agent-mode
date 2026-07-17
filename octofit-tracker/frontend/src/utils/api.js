const getCodespaceName = () => import.meta.env?.VITE_CODESPACE_NAME || '';

export const buildApiUrl = (path) => {
  const codespaceName = getCodespaceName();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api${path}`;
  }

  return `http://localhost:8000/api${path}`;
};

export const normalizeCollection = (payload, key) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload[key])) {
    return payload[key];
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};
