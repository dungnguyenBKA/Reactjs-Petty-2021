import axios, {AxiosRequestConfig, AxiosStatic} from "axios";
import * as AxiosLogger from 'axios-logger';
import Constants from "./Constants";

export default class AppApi{
	private appAxios: AxiosStatic
	private access_token: string = '';
	private appAxiosConfig: AxiosRequestConfig = {};

	constructor() {
		this.appAxios = axios
		this.appAxios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
		this.appAxios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)
		this.setToken('')
	}

	setToken(token: string) {
		this.access_token = token
		this.appAxiosConfig = {
			headers : {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}
	}

	login = (username: string, pwd: string) => {
		let bodyData = {
			'email': username,
			'password': pwd
		}
		return this.appAxios.post(Constants.BASE_URL_V1 + Constants.endPoint.LOGIN, bodyData, this.appAxiosConfig)
	}

	register = (name: string, username: string, pwd: string, phone: string|undefined) => {
		let bodyData = {
			'email': username,
			'password': pwd,
			'repeat_password': pwd,
			'phone': phone? phone : '',
			'name': name
		}
		return this.appAxios.post(Constants.BASE_URL_V1 + Constants.endPoint.LOGIN, bodyData, this.appAxiosConfig)
	}
}

