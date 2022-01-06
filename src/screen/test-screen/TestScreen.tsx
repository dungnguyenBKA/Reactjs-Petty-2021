import {collection, doc, getDocs, onSnapshot, setDoc,} from "firebase/firestore"
import {FC, useContext, useEffect, useState} from "react"
import {database} from "../../components/firebase/FirebaseApp";
import {AppCtx} from "../../App";
import Column from "../../components/Column";
import Messenger from "../petchat/Messenger";


interface TestScreenProp {

}

const TestScreen: FC<TestScreenProp> = (props) => {
	const testUser = doc(database, 'users/1')
	const usersCollectionRef = collection(database, 'users')
	const user = useContext(AppCtx).currentUser

	const setTestUser = async () => {
		await setDoc(testUser, user)
	}

	const [docs, setDocs] = useState<any[]>([])

	const getUsers = async () => {
		const querySnapshot = await getDocs(usersCollectionRef)
		querySnapshot.forEach((doc) => {
			console.log(doc.id, '=>', doc.data())
		})
	}

	useEffect(() => {
		let unsub = onSnapshot(usersCollectionRef, (snapshot) => {
			setDocs(
				snapshot.docs.map((doc) => {
						return doc.data()
					}
				)
			)
		})

		return () => {
			unsub()
		}
	}, [])

	return <Messenger/>
}

export default TestScreen
