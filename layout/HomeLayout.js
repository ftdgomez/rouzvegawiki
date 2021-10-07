import { Box } from '@chakra-ui/react'

export const HomeLayout = ({ children }) => (
    <Box bg="gray.800" minH='100vh' 
        borderTop='8px solid #FF5753'
        p={4}
    >{children}</Box>)