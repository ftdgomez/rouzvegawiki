import { FormControl, Select, FormLabel, Textarea, Input as ChakraInput } from '@chakra-ui/react';

export const Input = ({
    type,
    name,
    placeholder,
    value,
    label,
    helpText,
    selectPlaceholder,
    options,
    ...props
}) => {
    return (
        <FormControl {...props} id="email">
            <FormLabel color="white">
            {label} 
            </FormLabel>
            {type === 'select' ? (
                <Select
                color="white"
                placeholder={selectPlaceholder || 'Selecciona'}
                >
                    {options.map((option) => (
                        <option style={{ color: "black" }} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </Select>
            ) : type.startsWith('textarea') ? (
                <Textarea placeholder={placeholder} />
            ) : <ChakraInput
                    color="white"
                    placeholder={placeholder}
                    type={type.split('.')[1]}
                />
        }
            <FormHelperText>
                {helpText}
            </FormHelperText>
        </FormControl>
    )
}