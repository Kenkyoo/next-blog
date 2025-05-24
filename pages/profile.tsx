import { useSession } from "next-auth/react";
import Link from "next/link";
import MyPosts from "./myPosts";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <h1>Profile</h1>
        <MyPosts myPosts={[]} />
        <p>Signed in as {session.user?.email}</p>
      </div>
    );
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
}
