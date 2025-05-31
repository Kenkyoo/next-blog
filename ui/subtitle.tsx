import { Heading } from "@chakra-ui/react";

const Subtitle = ({ text }: { text: string }) => {
  return (
    <Heading size="4xl" letterSpacing="tight" fontWeight="bold" mb="3">
      {text}
    </Heading>
  );
};

export default Subtitle;
