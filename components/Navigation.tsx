"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button, Flex, Link as ChakraLink, Image } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import NextLink from "next/link";

export function Navigation() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="white"
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
    >
      <Flex align="center" mr={5}>
        <ChakraLink as={NextLink} href="/">
          <Image
            src="/logo.svg"
            alt="House Maintenance App Logo"
            height="8rem"
          />
        </ChakraLink>
      </Flex>

      <Flex align="center">
        {user ? (
          <>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/request">New Request</NavLink>
            <Button
              onClick={handleLogout}
              bg="#ff9202"
              color="white"
              _hover={{ bg: "#e68200" }}
              ml={4}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <Button
              as={NextLink}
              href="/signup"
              bg="#ff9202"
              color="white"
              _hover={{ bg: "#e68200" }}
              ml={4}
            >
              Sign Up
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <ChakraLink
    as={NextLink}
    href={href}
    mx={2}
    color="#002f6d"
    fontWeight="medium"
    position="relative"
    _hover={{
      textDecoration: "none",
      _after: {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "2px",
        bottom: "-2px",
        left: 0,
        backgroundColor: "#ff9202",
      },
    }}
  >
    {children}
  </ChakraLink>
);
