// export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = "https://jurijobbackend-086b718701d1.herokuapp.com";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  accessToken?: string | null
): Promise<Response> {
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };

  //Ajout du token si présent
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  return res;
}
