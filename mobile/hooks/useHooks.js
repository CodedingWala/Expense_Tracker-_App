import { useCallback, useState } from "react"
import { Alert, Platform } from "react-native"
import { url } from "../constants/Api"



const BASE_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:5001"
        : "http://localhost:5001"


export const useTransaction = (userId) => {
    console.log("userid: ", userId)
    const [isLoading, setisLoading] = useState(true)
    const [transactions, settransactions] = useState([])
    const [summary, setsummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0
    })

    const getTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${url}/${userId}`)
            const data = await response.json()
            console.log("data in gettrNSACTION: ", data)
            settransactions(data.data)
        } catch (error) {
            console.log("some error: ", error.message)
            Alert.alert("Error: ", "error in the getTransaction")
        }
    }, [userId])


    const getSummary = useCallback(async () => {
        try {
            const response = await fetch(`${url}/summary/${userId}`)
            const data = await response.json()
            console.log("data in getsummary: ", data)
            setsummary(data)
        } catch (error) {
            console.log("some error: ", error.message)
            Alert.alert("Error: ", "error in get summary")
        }
    }, [userId])


    const loadData = useCallback(async () => {
        if (!userId) { return }
        try {
            await Promise.all([getTransactions(), getSummary()])
        } catch (error) {
            console.log("some error: ", error.message)
            Alert.alert("Error: ", "error in loadData")
        } finally {
            setisLoading(false)
        }
    }, [userId])


    const deleteTransaction = useCallback(async (id) => {
        if (!id) { return }

        try {
            const response = await fetch(`${url}/delete/${id}`, { method: "DELETE" })
            if (!response.ok) {
                throw new Error("failed to delete transactions")
            }
            const data =await response.json()
            await loadData()
            Alert.alert("success", `transaction deleted successfully`)
        } catch (error) {
            console.log("some error: ", error.message)
            Alert.alert("Error: ", "error in deleteTransction")
        } finally {
            setisLoading(false)
        }
    }, [userId])

    return { transactions, summary, isLoading, deleteTransaction, loadData }



}

