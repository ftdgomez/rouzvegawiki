import { Box } from '@chakra-ui/react'
import Link from 'next/link'

export const MainLayout = ({ children }) => {
    return (
        <Box bg={"gray.900"}>
            <Box p={4} maxW="4xl" mx='auto' minH={"100vh"} bg={"gray.900"}>
                <Link href='/collaborate'>
                    <Box 
                        bg='purple.500'
                        color='white'
                        fontWeight='bold' 
                        p='.5rem'
                        rounded='md'
                        w='3.2rem'
                        textAlign='center'
                        fontSize='1.5rem'
                        _hover={{
                            cursor: 'pointer'
                        }}
                    >
                        {'<'}
                    </Box>
                </Link>
                {children}
            </Box>
        </Box>
    )
}