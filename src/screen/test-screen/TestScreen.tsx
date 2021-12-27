import {FC, useContext} from "react"
import {AppCtx} from "../../App";


interface TestScreenProp {

}

const TestScreen: FC<TestScreenProp> = (props) => {
	let appContext = useContext(AppCtx)
	let logger = appContext.logger

	logger.log('Fuck')
	return <p>OK</p>
}

// function merge(...args: any[]) {
//     let filteredArgs = args.filter(item => item !== undefined && item !== null)
//     let res = 
// }

export default TestScreen
