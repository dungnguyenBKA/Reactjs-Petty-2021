import React, { useState } from 'react';
import {database} from "../firebase/FirebaseApp";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export type Condition = {
	fieldName: string,
	operator: string,
	compareValue: string
}

const useFirestore = (collectionName: string, condition: Condition) => {
	const [documents, setDocuments] = useState([]);

	// React.useEffect(() => {
	// 	let collectionRef = collection(database, collectionName)
	// 	const q = query(collectionRef, orderBy('createdAt'))
	// 	if (condition) {
	// 		if (!condition.compareValue || !condition.compareValue.length) {
	// 			// reset documents data
	// 			setDocuments([]);
	// 			return;
	// 		}
	//
	// 		where()
	// 		collectionRef = collectionRef.where(
	// 			condition.fieldName,
	// 			condition.operator,
	// 			condition.compareValue
	// 		);
	// 	}
	//
	// 	const unsubscribe = onSnapshot() collectionRef.onSnapshot((snapshot) => {
	// 		const documents = snapshot.docs.map((doc) => ({
	// 			...doc.data(),
	// 			id: doc.id,
	// 		}));
	//
	// 		setDocuments(documents);
	// 	});
	//
	// 	return () => {
	// 		unsubscribe()
	// 	}
	// }, [collection, condition]);

	return documents;
};

export default useFirestore;
