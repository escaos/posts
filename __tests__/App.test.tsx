import { render } from "@testing-library/react-native";

import App from "../App";

const createFetchMock = <T,>(data: T) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  url: "https://jsonplaceholder.typicode.com/posts",
  headers: {
    get: () => "application/json",
  },
  json: async () => data,
});

describe("App", () => {
  it("shows the feed when posts load successfully", async () => {
    const posts = [
      {
        userId: 1,
        id: 1,
        title: "Hello world",
        body: "This is the first post body",
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce(createFetchMock(posts));

    const { findByText } = render(<App />);

    expect(await findByText("Hello world")).toBeTruthy();
  });
});
