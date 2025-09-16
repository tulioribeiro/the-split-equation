import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("fetches data from API and displays result", async () => {
  render(<App />);

  const result = await waitFor(() => screen.getByTestId("api-result"));

  expect(result).toHaveTextContent("ok");
});
