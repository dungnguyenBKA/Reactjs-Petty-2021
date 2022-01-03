import {FC, useEffect, useState} from "react";
import {BaseTextFieldProps, StandardTextFieldProps} from "@mui/material/TextField/TextField";
import {FilledInput, TextField} from "@mui/material";


interface BaseValidateTextInputProps extends BaseTextFieldProps {
    /**
     * @name checkValidFunctions
     * @param listValidator need an array of checking valid input (because may be more than one validate are required)
     */
    checkValidFunctions: ((input: string) => [boolean, string?])[]
    setValue: (value: string) => void
}

const BaseValidateTextInput: FC<BaseValidateTextInputProps> = (props) => {
    let {checkValidFunctions} = props
    let [text, setText] = useState('')
    let [isValid, setIsValid] = useState(true)

    /**
     * Return true if all checker function is true
     * */
    let checkIsValid = (): boolean => {
        return !checkValidFunctions.map(fn => {
            return fn(text)[0]
        }).includes(false)
    }

    /**
     * Return an error text base on checker function (ordered)
     * */
    let handleErrorText = (): string => {
        for (const checkValidFunction of checkValidFunctions) {
            let res = checkValidFunction(text)
            console.log(res)
            if (!res[0]) {
                return res[1] ? res[1] : ''
            }
        }
        return ''
    }

    useEffect(() => {
        setIsValid(checkIsValid())
    }, [text])

    return <TextField
        {...props}
        style={props.style}
        value={text}
        onChange={
            (e) => {
                let value = e.target.value
                setText(value)
                props.setValue(value)
            }
        }

        onFocus={
            (e) => {
                setIsValid(checkIsValid())
                console.log('on focus')
            }
        }
        onBlur={(e) => {
            setIsValid(true)
            console.log('on blur')
        }
        }
        helperText={handleErrorText()}
        error={!isValid && text.length > 0}
        InputProps={{
            style:{borderWidth: 0
        }
        }}
    />
}

export default BaseValidateTextInput



