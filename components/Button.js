import {Button as ChackraButton} from '@chakra-ui/react';


export const Button = (props) => {
    return (
        <ChackraButton
            colorScheme="orange"
            size="lg"
            {...props}
        />
    )
}