import { Stack, Button } from "@chakra-ui/react";

export const StepCard = ({
  step,
  handler,
  btnText = "Siguiente",
  children,
}) => {
  return (
      <Stack
      className="animation_fadeInUp"
        spacing={4}
        align={"center"}
        justify={"center"}
        border={"1px solid"}
        shadow={"xl"}
        w={"full"}
        maxW={"7xl"}
        bg={"gray.800"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
          {step > 0 && 
        <Button
          onClick={() => handler(step - 1)}
          bg={"purple.600"}
          size={"sm"}
          maxW={"md"}
          color={"white"}
          _hover={{
            bg: "purple.800",
          }}
        >
            {'<'}
        </Button>
            }
        {children}
        <Button
          onClick={() => handler(step + 1)}
          bg={"purple.600"}
          maxW={"md"}
          color={"white"}
          _hover={{
            bg: "purple.800",
          }}
        >
          {btnText}
        </Button>
      </Stack>
  );
};
