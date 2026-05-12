const apiRoutePrefix = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchApi = (
  path: string,
  options: RequestInit & { body?: any } = {},
) => {
  return fetch(`${apiRoutePrefix}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body:
      options.body && typeof options.body !== "string"
        ? JSON.stringify(options.body)
        : options.body,
  });
};
