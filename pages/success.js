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
            <Image alt="" src="/kiss.gif" />
            <Text color='white' mt={4} fontWeight='bold' textAlign='center'>
                Vamossss!!! gracias por contribuir al profundo y extenso lore
                de Rouz Vega.
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