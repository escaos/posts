import { log } from "../lib/logger";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type RequestOptions = Omit<RequestInit, "method"> & {
  signal?: AbortSignal;
};

export class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly body?: unknown;

  constructor({
    message,
    status,
    statusText,
    url,
    body,
  }: {
    message: string;
    status: number;
    statusText: string;
    url: string;
    body?: unknown;
  }) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.body = body;
  }
}

async function parseJson(response: Response) {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function get<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const signal = options.signal ?? controller.signal;

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15_000);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      method: "GET",
      signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    const data = await parseJson(response);

    if (!response.ok) {
      throw new HttpError({
        message: `Request failed with status ${response.status}`,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: data,
      });
    }

    return data as T;
  } catch (error) {
    log(error, { scope: "http.get", path });
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
