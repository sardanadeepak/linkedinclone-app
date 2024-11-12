import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

interface DocumentData {
    id: string,
    name: string,
    description: string,
    message: string,
    photoUrl: string,
    createdAt: string

}

interface UseFireStoreReturn {
    docs: DocumentData[],
    error: string | null
}

const useFirestore = (collectionName: string): UseFireStoreReturn => {
    const [docs, setDocs] = useState<DocumentData[]>([])
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const collectionRef = collection(projectFirestore, collectionName)
        const q = query(collectionRef, orderBy("createdAt", 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let documents: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() } as DocumentData)
            })
            setDocs(documents)
        },
            (error) => {
                setError(error.message)
            })

        return () => unsubscribe()

    }, [collectionName])

    return { docs, error }

}

export default useFirestore
