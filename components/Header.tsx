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
          <Button variant="ghost"></Button>
        )}
        <ChakraLink asChild>
          <Icon size="2xl" color="teal.600">
            <svg viewBox="0 0 32 32">
              <g fill="currentColor">
                <path d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z" />
                <path d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z" />
              </g>
            </svg>
          </Icon>
        </ChakraLink>
        <Text fontWeight="bold" textStyle="xl" className="me-5">
          BLOG
        </Text>
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
        <Text hideBelow="md">Chakra</Text>
      </div>
      <div className="flex gap-3">
        {session ? (
          <Menu.Root size={"md"} variant="subtle">
            <Menu.Trigger asChild>
              <Button variant="ghost">
                <UserAvatar src={userImage} />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content py="8" px="10">
                  <Menu.Item value="new-txt">
                    <Link href="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item value="new-file">
                    <Link href="/create">New post</Link>
                  </Menu.Item>
                  <Menu.Item value="new-win">
                    <Button
                      bg={{ base: "gray.950", _dark: "gray.50" }}
                      color={{ base: "gray.50", _dark: "gray.950" }}
                      variant="solid"
                      px="2"
                      onClick={() => signOut()}
                    >
                      Log out
                    </Button>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <Link href="/login">
            <Button
              bg={{ base: "gray.950", _dark: "gray.50" }}
              color={{ base: "gray.50", _dark: "gray.950" }}
              variant="solid"
              px="4"
            >
              Log in
            </Button>
          </Link>
        )}
        <ToggleMode />
      </div>
    </Flex>
  );
};

export default Navbar;
