import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    Image,
  } from '@chakra-ui/react';
import { signIn, useSession } from "next-auth/client"
  
export function Login() {
    const [session, loading] = useSession();

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.900'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={'gray.800'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
              <Image
               height={'80px'}
               src={'/TwitchGlitchPurple.svg'} 
               alt="Twitch Logo" />
          <Heading 
          color={'white'}
          textAlign='center'
           lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Inicia sesión con tu cuenta de Twitch
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'sm' }}
            textAlign='center'
            color={'gray.200'}>
                Es necesario para atribuir tu colaboración y verificar
                que eres una persona :)
          </Text>
          <Stack spacing={6}>
            <Button
              onClick={() => signIn('twitch')}
              bg={'purple.600'}
              color={'white'}
              isLoading={loading}
              _hover={{
                bg: 'purple.800',
              }}>
              Iniciar sesión con Twitch
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }