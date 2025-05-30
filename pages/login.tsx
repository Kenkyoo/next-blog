import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { Container } from "@chakra-ui/react";

const Login = () => {
  return (
    <Container>
      <Fieldset.Root size="lg" maxW="md" px="4">
        <Stack>
          <Fieldset.Legend>Contact details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your contact details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input name="name" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">
          <Link href="/api/auth/signin">Log in</Link>
        </Button>
      </Fieldset.Root>
    </Container>
  );
};

export default Login;
