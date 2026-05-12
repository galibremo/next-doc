const apiRoutePrefix = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchApi = (path: string, options?: RequestInit) => {
  return fetch(`${apiRoutePrefix}${path}`, options);
};
