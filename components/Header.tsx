import { Button, Menu, Portal } from "@chakra-ui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ToggleMode from "./ToggleMode";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";
import { Text } from "@chakra-ui/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/posts", label: "Posts" },
  { href: "/drafts", label: "Drafts" },
  { href: "/favorites", label: "Favorites" },
];
const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session?.user.image);
  if (status === "loading") {
    return <p>Validating session ...</p>;
  }

  return (
    <Flex
      px="4"
      py="3"
      gap="4"
      justify="space-between"
      justifyItems="center"
      alignItems="center"
    >
      <div className="flex gap-8">
        {session ? (
          <Menu.Root>
            +
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
          <ChakraLink asChild>
            <NextLink href="/">Home</NextLink>
          </ChakraLink>
        )}

        <ChakraLink asChild hideBelow="md">
          <NextLink href="/posts">Feed</NextLink>
        </ChakraLink>
        <ChakraLink asChild hideBelow="md">
          <NextLink href="/search">Search</NextLink>
        </ChakraLink>
      </div>
      <div className="flex gap-3">
        <Icon size="lg" color="pink.700" hideBelow="md">
          <HiHeart />
        </Icon>
        <Text hideBelow="md">Dev by Kenkyo</Text>
      </div>
      <div className="flex gap-3">
        {session ? (
          <button onClick={() => signOut()}>Log out</button>
        ) : (
          <Link href="/api/auth/signin">Log in</Link>
        )}
        <ToggleMode />
      </div>
    </Flex>
  );
};

export default Navbar;
