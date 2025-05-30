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
import UserAvatar from "../ui/avatar";
import { FiMenu } from "react-icons/fi";

const links = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/posts", label: "Posts" },
  { href: "/drafts", label: "Drafts" },
  { href: "/favorites", label: "Favorites" },
];
const Navbar = () => {
  const { data: session, status } = useSession();
  const userImage = session?.user?.image as string;
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
          <Menu.Root size={"md"} variant="subtle">
            <Menu.Trigger asChild>
              <Icon size="lg" className="cursor-pointer">
                <FiMenu />
              </Icon>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content py="8" px="10">
                  {links.map((link) => (
                    <Menu.Item key={link.label} value={link.href} mt="2">
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
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="ghost">
                <UserAvatar src={userImage} />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="new-txt">
                    <Link href="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item value="new-file">
                    <Link href="/new post">New post</Link>
                  </Menu.Item>
                  <Menu.Item value="new-win">
                    <Button onClick={() => signOut()}>Log out</Button>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <Link href="/login">Log in</Link>
        )}
        <ToggleMode />
      </div>
    </Flex>
  );
};

export default Navbar;
