export default async function callServer<T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<[req: Response, data: Promise<T>]> {
  const response = await fetch(input, {
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
      Authorization: `Basic ${localStorage.getItem('token')}`,
    },
    ...init,
  });
  return [response, response.json() satisfies Promise<T>];
}
