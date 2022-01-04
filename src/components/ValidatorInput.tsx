import {FC, useEffect, useState} from "react";
import {StandardTextFieldProps} from "@mui/material/TextField/TextField";
import {TextField} from "@mui/material";


interface ValidateTextInputProps extends StandardTextFieldProps {
	/**
	 * @name checkValidFunctions
	 * @param listValidator need an array of checking valid input (because may be more than one validate are required)
	 */
	checkValidFunctions: ((input: string) => [boolean, string?])[]
	setValue: (value: string) => void
	setValid?: (isValid: boolean) => void
}

const ValidateTextInput: FC<ValidateTextInputProps> = (props) => {
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
			if (!res[0]) {
				return res[1] ? res[1] : ''
			}
		}
		return ''
	}

	useEffect(() => {
		let isValid = checkIsValid()
		setIsValid(isValid)

		if(props.setValid) {
			props.setValid(isValid)
		}
		console.log('text: ',text, isValid)
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
			}
		}
		onBlur={(e) => {
			setIsValid(true)
		}
		}
		helperText={handleErrorText()}
		error={!isValid && text.length > 0}
	/>
}

export default ValidateTextInput



