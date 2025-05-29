import { Container } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button, Menu, Portal } from "@chakra-ui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ToggleMode from "./ToggleMode";

const links = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/posts", label: "Posts" },
  { href: "/drafts", label: "Drafts" },
  { href: "/favorites", label: "Favorites" },
];
const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "loading") {
    return <p>Validating session ...</p>;
  }

  return (
    <Container fluid>
      <Flex gap="4">
        {session ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {links.map((link) => (
                    <Menu.Item key={link.label} value={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <p>App</p>
        )}
        {session ? (
          <button onClick={() => signOut()}>Log out</button>
        ) : (
          <Link href="/api/auth/signin">Log in</Link>
        )}
        <ToggleMode />
      </Flex>
    </Container>
  );
};

export default Navbar;
