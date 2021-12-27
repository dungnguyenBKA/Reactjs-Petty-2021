import {toast} from "react-hot-toast";

/**
 * Logger only on local (url == localhost)
 * */
export default class Logger {
	private readonly isShowLog: boolean
	private readonly toastOpts = {
		duration: 1000
	}

	constructor() {
		this.isShowLog = window.location.hostname === "localhost";
	}

	log = (data: any[]|any) => {
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
			this.successToast(msg)
		}
	}

	errorToastLog = (msg?: string) => {
		if (this.isShowLog) {
			this.errorToast(msg)
		}
	}

	normalToastLog = (msg?: string) => {
		if (this.isShowLog) {
			this.normalToast(msg)
		}
	}

	successToast = (msg?: string) => {
		if (msg) {
			toast.success(msg, this.toastOpts)
		} else {
			toast.success('Thành công', this.toastOpts)
		}

	}

	errorToast = (msg?: string) => {
		if (msg) {
			toast.error(msg, this.toastOpts)
		} else {
			toast.error('Đã có lỗi xảy ra, vui lòng thử lại', this.toastOpts)
		}
	}

	normalToast = (msg?: string) => {
		if (msg) {
			toast(msg, this.toastOpts)
		}
	}
}