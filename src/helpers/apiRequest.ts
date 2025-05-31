type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const getToken = () => {
  return sessionStorage.getItem("_auth_session_token");
};

const buildQueryString = (queryParams: Map<string, string | number>) => {
  const queryString = Array.from(queryParams.entries())
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return `?${queryString}`;
};

export const buildPetition = (
  url: string,
  method: HttpMethod,
  queryParams?: Map<string, string | number>,
  body?: any
): { url: string; init: RequestInit } => {
  if (queryParams && queryParams.size > 0) {
    url += buildQueryString(queryParams);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) headers["Authorization"] = token;

  const init: RequestInit = {
    method: method,
    body: body ? JSON.stringify(body) : null,
    headers: headers,
  };

  return { url, init };
};
