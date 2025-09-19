import type { Route } from "./+types/signin";
import { redirect, useFetcher } from "react-router";

type SignupResponse = {
  signInFailure: boolean;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "sign-in" },
    { name: "description", content: "Please sign in" },
  ];
}

// formでpostするとactionが呼ばれる
export async function action({
  request,
}: Route.ActionArgs): Promise<SignupResponse | Response> {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // とりあえず、emailとpasswordはベタ書き
  if (email === "a@example.com" && password === "aaa") {
    return redirect("/home");
  }
  return { signInFailure: true };
}

export default function Signup(_: Route.ComponentProps) {
  let fetcher = useFetcher<SignupResponse>();
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <fetcher.Form method="post">
        {fetcher.data?.signInFailure && (
          <div className="text-red-700 mb-4">Something went wrong</div>
        )}
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

        <button type="submit">Sign In</button>
      </fetcher.Form>
    </main>
  );
}
