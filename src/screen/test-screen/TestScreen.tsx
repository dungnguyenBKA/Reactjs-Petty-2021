import {FC, useState} from "react"
import ValidateTextInput from "../../components/ValidatorInput";
import Column from "../../components/Column";
import {margin} from "../../AppStyle";


interface TestScreenProp {

}

const TestScreen: FC<TestScreenProp> = (props) => {
	let checkIsLenValid = (text: string): [boolean, string?] => {
		return [text.length >= 3, 'text is min 3 chars'];
	}

	let checkIsContainValid = (text: string): [boolean, string?] => {
		return [text.includes('@'), 'text should include @'];
	}

	let checkIsPwdValid = (text: string): [boolean, string?] => {
		return [text.length >= 8, 'password should min 8 chars']
	}

	let [email, setEmail] = useState('')
	let [pwd, setPwd] = useState('')

	return <Column>
		<ValidateTextInput
			style={
				margin(16)
			}
			checkValidFunctions={[checkIsLenValid, checkIsContainValid]}
			name={"Email"}
			type="text"
			placeholder={"Mail ne`"}
			setValue={setEmail}
		/>

		<ValidateTextInput
			style={
				margin(16)
			}
			checkValidFunctions={[checkIsPwdValid]}
			name={"Password"}
			placeholder={"Password ne`"}
			type="password"
			setValue={setPwd}
		/>

		<h1>{email}</h1>
		<h1>{pwd}</h1>
	</Column>
}

export default TestScreen
