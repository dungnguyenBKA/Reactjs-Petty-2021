import {FC, useContext, useEffect, useState} from "react"
import ValidateTextInput from "../../components/ValidatorInput";
import Column from "../../components/Column";
import {margin} from "../../AppStyle";
import User from "../../models/User";
import Logger from "../../api/Logger";
import ApiHelper from "../../api/ApiHelper";
import {NetworkErrorHandler} from "../../api/AppApi";
import {AppCtx} from "../../App";
import {AxiosError} from "axios";


interface TestScreenProp {

}

const TestScreen: FC<TestScreenProp> = (props) => {
	let appContext = useContext(AppCtx)
	let appApi = appContext.appApi
	let chatAppApi = appContext.chatApi
	const currentUser = appContext.currentUser

	useEffect(() => {
		let controller = new AbortController()
		const fetchAllUsers = async () : Promise<User[]> => {
			if(!currentUser) {
				return []
			}
			try {
				let res = await appApi.ensureAuthorize(currentUser.email, currentUser.pwd, () => {
					return appApi.getAllUsers(controller)
				})

				if(res.data.statusCode === 200) {
					return res.data.data
				}
			} catch (e) {
				return []
			}

			return []
		}

		const getOrCreateChatUser = async (user: User) => {
			try {
				let chatRes = await chatAppApi.getOrCreateChatUser(user)
				if (chatRes.status === 200) {
					Logger.log('created chat users', {user})
				}
			} catch (e) {
				ApiHelper.handleCallApiError(e, new class implements NetworkErrorHandler {
					onNetworkError(e: AxiosError): void {
						Logger.error(e)
					}

					onOtherError(e: unknown): void {
						Logger.error(e)
					}
				}())
			}
		}

		const createAllChatUser = async () => {
			try {
				let users = await fetchAllUsers()

				Logger.log('users', {users})

				await Promise.all(users.map((user) => {
					return getOrCreateChatUser(user)
				}))
			} catch (e) {
				Logger.error(e)
			}
		}

		createAllChatUser().then(
			() => {
				Logger.successToast("DONE")
			}
		)

		return () => {
			controller.abort()
		}

	}, [])

	return null
}

export default TestScreen
