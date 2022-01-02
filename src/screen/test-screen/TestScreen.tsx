import {FC} from "react"
import ValidateTextInput from "../../components/ValidatorInput";
import Column from "../../components/Column";


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

	return <Column>
		<ValidateTextInput
			checkValidFunctions={[checkIsLenValid, checkIsContainValid]}
			name={"Email"}
			type="text"
			placeholder={"Mail ne`"}
		/>

		<ValidateTextInput
			checkValidFunctions={[checkIsPwdValid]}
			name={"Password"}
			placeholder={"Password ne`"}
			type="password"
		/>
	</Column>
}

export default TestScreen
