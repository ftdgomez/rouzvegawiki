import { Image, Flex, Text } from '@chakra-ui/react'

export const Loader = () => {
    return (
        <Flex 
            bg='gray.900'
            minH="100vh"
            alignItems="center" 
            justifyContent="center"
            flexDirection="column"
        >
            <Image alt="" src="/loader.gif" />
            <Text color='white' mt={4} fontWeight='bold' textAlign='center'>Cargando...</Text>
        </Flex>
    )
}