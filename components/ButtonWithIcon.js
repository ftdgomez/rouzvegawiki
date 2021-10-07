import { Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export const ButtonWithIcon = ({ imagePath, icon, text, to }) => {
  return (
    <Link href={to}>
      <Flex
        border="1px solid white"
        mx="auto"
        w="full"
        maxW="180px"
        p="1rem"
        borderRadius="4px"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        _hover={{
          bg: "orange.500",
          color: "white",
          cursor: "pointer",
        }}
      >
        {icon && icon}
        {imagePath && <Image src={imagePath} width="49px" alt={text} />}
        <Text fontWeight="bold" mt="1rem" color="white">
          {text}
        </Text>
      </Flex>
    </Link>
  );
};
