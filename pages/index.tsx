// pages/blog.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import background from "@/public/background.jpeg";
import { Button, ButtonGroup } from "@chakra-ui/react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Welcome to Our Awesome Website
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover amazing features and services that await you.
        </p>
        <ButtonGroup>
          <Button>
            <Link href="/posts">Get started</Link>
          </Button>
          <Button>
            <Link href="/login">Log in</Link>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Hero;
