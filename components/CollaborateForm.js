import {
  Flex,
  Heading,
  Box,
  Grid,
  Avatar,
  Text,
  Image
} from "@chakra-ui/react";
import {Button } from '@components/Button'
import { useSession, signOut } from "next-auth/client";
import { ButtonWithIcon } from "./ButtonWithIcon";

export function CollaborateForm() {
  const [session] = useSession();
  return (
      <Flex  p={4}  minH={"100vh"} align={"center"} justify={"center"} bg={"gray.900"}>
        <Button
          position="fixed"
          top={0}
          right={0}
          m='1rem'
          bg="orange.400"
          color="white"
          size="sm"
          onClick={() => signOut()}
        >
          Cerrar Sesión
        </Button>
        <Box bg="gray.800" p={{
            sm: "1rem",
            md: "2rem",
            lg: "8rem 2rem",
        }} w='100%' maxW='7xl' m='auto'>
            <Avatar src={session.user.image} size="xl" mx="auto" display="block" mb="4" />
            <Heading textAlign='center' mb={4} color='white' size='md'>
                Hola <Text as='span' color='orange.400'>{session.user.name}</Text>! qué bonito tenerte por aquí.
            </Heading>
            <Text textAlign='center' mb={4} color="white">¿Cómo quieres contribuir con la wiki?</Text>
            <Grid
                mt={6}
                gridTemplateColumns={
                    {
                    sm: '1fr',
                    md: '1fr 1fr',
                    lg: '1fr 1fr 1fr 1fr',
                    }
                }
                justify='center'
                gap={4}
            >
                <ButtonWithIcon
                    imagePath='/confetti.svg'
                    text='Momentazo'
                    to='/collaborate/moment'
                />
                <ButtonWithIcon
                    imagePath='/chat.svg'
                    text='Cita'
                    to='/collaborate/quote'
                />
                <ButtonWithIcon
                    imagePath='/word-of-mouth.svg'
                    text='Palabra'
                    to='/collaborate/dictionary'
                />
                <ButtonWithIcon
                    imagePath='/inspiration.svg'
                    text='Personaje'
                    to='/collaborate/character'
                />
            </Grid>
        </Box>
      </Flex>
  );
}
