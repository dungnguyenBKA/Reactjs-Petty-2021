import {toast} from "react-hot-toast";

/**
 * Logger only on local (url == localhost)
 * */
export default class Logger {
	private readonly isShowLog: boolean

	constructor() {
		this.isShowLog = window.location.hostname === "localhost";
	}

	log = (data: any[]) => {
		if (this.isShowLog) {
			console.log(data)
		}
	}

	error = (e: unknown) => {
		if (this.isShowLog) {
			console.error(e)
		}
	}

	successToastLog = (msg?: string) => {
		if (this.isShowLog) {
			if (msg) {
				toast.success(msg)
			} else {
				toast.success('Thành công')
			}
		}
	}

	errorToastLog = (msg?: string) => {
		if (this.isShowLog) {
			if (msg) {
				toast.error(msg)
			} else {
				toast.error('Đã có lỗi xảy ra, vui lòng thử lại')
			}
		}
	}

	successToast = (msg?: string) => {
		if (msg) {
			toast.success(msg)
		} else {
			toast.success('Thành công')
		}

	}

	errorToast = (msg?: string) => {
		if (msg) {
			toast.error(msg)
		} else {
			toast.error('Đã có lỗi xảy ra, vui lòng thử lại')
		}
	}
}