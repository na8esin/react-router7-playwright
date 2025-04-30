import type { Route } from "./+types/signin";
import { redirect, useFetcher } from "react-router";

export async function action() {
  console.log("hello");
  return redirect("/home");
}

export default function Signup({ loaderData }: Route.ComponentProps) {
  let fetcher = useFetcher();
  console.log(loaderData);
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <fetcher.Form method="post">
        <p>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300"
          />
        </p>

        <p>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-300"
          />
        </p>

        <button type="submit">Sign Up</button>
      </fetcher.Form>
    </main>
  );
}
