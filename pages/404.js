import Link from "next/link";
import { Flex, Image, Text } from "@chakra-ui/react";

export default function Page(){
    return (
        <Flex 
            bg='gray.900'
            minH="100vh"
            alignItems="center" 
            justifyContent="center"
            flexDirection="column"
        >
            <Image alt="" src="/sad.png" />
            <Text color='white' mt={4} fontWeight='bold' textAlign='center'>
                Pero no les dije que no hicieran click en ningún sitio???
                Que están rotillas las cosas porque la auth con twitch no funciona
                correctamente. Besis de fresis.
            </Text>
            <Link href="/">
                <a style={
                    {
                        color: 'white',
                    }
                }>
                    Volver al inicio
                </a>
            </Link>
        </Flex>
    )
}