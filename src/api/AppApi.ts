import axios, {AxiosRequestConfig, AxiosStatic} from "axios";
import * as AxiosLogger from 'axios-logger';
import Constants from "./Constants";
import {
	AllPetsResponse,
	LoginResponse,
	PetDetailResponse,
	RegisterResponse,
	TokenUserResponse,
	UserResponse
} from "./ApiJsonFormat";

export default class AppApi {
	private appAxios: AxiosStatic
	private access_token: string = '';
	private appAxiosConfig: AxiosRequestConfig = {};
	private static DEFAULT_LEN_ITEMS = 5;

	constructor() {
		this.appAxios = axios
		this.appAxios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
		this.appAxios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)
		this.setToken('')
	}

	setToken(token: string) {
		console.log({token})
		this.access_token = token
		this.appAxiosConfig = {
			headers: {
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
		return this.appAxios.post<LoginResponse>(Constants.BASE_URL_V1 + Constants.endPoint.LOGIN, bodyData, this.appAxiosConfig)
	}

	register = (name: string, username: string, pwd: string, avatar: string | undefined, phone: string | undefined) => {
		let bodyData = {
			'email': username,
			'password': pwd,
			'repeatPassword': pwd,
			'phone': phone ? phone : '',
			'name': name,
			'avatar': avatar ? avatar : '',
		}
		return this.appAxios.post<RegisterResponse>(Constants.BASE_URL_V1 + Constants.endPoint.REGISTER, bodyData, this.appAxiosConfig)
	}

	getAllPets = (page: number, size: number = AppApi.DEFAULT_LEN_ITEMS) => {
		const paramsData = {
			params: {
				'page': page,
				'size': size
			}
		}
		return this.appAxios.get<AllPetsResponse>(Constants.BASE_URL_V1 + Constants.endPoint.PETS, paramsData)
	}

	getPetById = (id: string) => {
		return this.appAxios.get<PetDetailResponse>(Constants.BASE_URL_V1 + Constants.endPoint.PETS + `/${id}`)
	}

	getUserById = (id: number) => {
		return this.appAxios.get<UserResponse>(Constants.BASE_URL_V1 + Constants.endPoint.USERS + `/${id}`, this.appAxiosConfig)
	}
}
