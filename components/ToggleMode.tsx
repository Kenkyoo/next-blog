"use client";

import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { Tooltip } from "@/components/ui/tooltip";

const ToggleMode = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <Tooltip
        showArrow
        content="Dark and light mode"
        contentProps={{ css: { "--tooltip-bg": "teal" } }}
      >
        <IconButton onClick={toggleColorMode} variant="outline" size="sm">
          {colorMode === "light" ? <LuSun /> : <LuMoon />}
        </IconButton>
      </Tooltip>
    </ClientOnly>
  );
};

export default ToggleMode;
