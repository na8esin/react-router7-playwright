import React from "react";
import { beforeAll, test, expect, afterEach, afterAll } from "@jest/globals";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../signin";

const server = setupServer(
  http.get("/greeting", () => {
    return HttpResponse.json({ greeting: "hello there" });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays greeting", async () => {
  render(<Signup params={{}} loaderData={undefined} matches={[]} />);

  fireEvent.click(screen.getByText("Load Greeting"));

  await screen.findByRole("heading");

  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
});
