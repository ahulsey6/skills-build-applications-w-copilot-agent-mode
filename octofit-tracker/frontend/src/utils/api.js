const getCodespaceName = () => import.meta.env?.VITE_CODESPACE_NAME?.trim() || '';

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api${normalizedPath}`;
  }

  return `http://localhost:8000/api${normalizedPath}`;
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

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
};
