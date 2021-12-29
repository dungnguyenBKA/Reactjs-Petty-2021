import User from "../models/User";

interface UserResponse {
	token: string,
	user: User
}

export interface LoginResponse {
	statusCode: number,
	data: UserResponse,
	message: string
}

export interface RegisterResponse {
	statusCode: number,
	data: UserResponse,
	message: string
}
