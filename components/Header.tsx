import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;
  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/" className="bold" data-active={isActive("/")}>
        Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" data-active={isActive("/signup")}>
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" className="bold" data-active={isActive("/")}>
          Feed
        </Link>
        <Link href="/drafts" data-active={isActive("/drafts")}>
          My drafts
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user?.name} ({session.user?.email})
        </p>
        <Link href="/create">New post</Link>
        <button onClick={() => signOut()}>Log out</button>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        a,
        button {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
          border: 1px solid var(--geist-foreground);
          padding: 0.5rem 1rem;
          border-radius: 3px;
          background: none;
          cursor: pointer;
        }

        a + a,
        a + button,
        button + a {
          margin-left: 1rem;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        .left,
        .right {
          display: flex;
          align-items: center;
        }

        .right {
          margin-left: auto;
        }

        .right p {
          display: inline-block;
          font-size: 13px;
          padding-right: 1rem;
        }

        button {
          border: none;
        }
      `}</style>
    </nav>
  );
};

export default Header;
