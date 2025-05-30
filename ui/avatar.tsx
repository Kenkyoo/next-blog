import { Avatar, HStack, defineStyle } from "@chakra-ui/react";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

export default function UserAvatar({ src }: { src: string }) {
  return (
    <HStack gap="4">
      <Avatar.Root css={ringCss} colorPalette="pink">
        <Avatar.Fallback name="Random" />
        <Avatar.Image src={src} />
      </Avatar.Root>
    </HStack>
  );
}
