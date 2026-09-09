import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useTransaction } from '../../hooks/useHooks'
import { url } from '../../constants/Api'
import { useAuth, useClerk, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { COLORS } from '../../constants/colors'
import { styles } from '../../assets/styles/create.styles'
import { Ionicons } from '@expo/vector-icons'



const CATEGORIES = [
    { id: "food", name: "Food & Drinks", icon: "fast-food" },
    { id: "shopping", name: "Shopping", icon: "cart" },
    { id: "transportation", name: "Transportation", icon: "car" },
    { id: "entertainment", name: "Entertainment", icon: "film" },
    { id: "bills", name: "Bills", icon: "receipt" },
    { id: "income", name: "Income", icon: "cash" },
    { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const create = () => {
    const router = useRouter()
    const { user } = useUser()
    const [title, settitle] = useState("")
    const [category, setcategory] = useState("")
    const [amount, setamount] = useState("")
    const [isExpense, setisExpense] = useState(true)
    const [isLoading, setisLoading] = useState(false)

    //  { user_id, title, category, amount }
    const handleGetTransaction = async () => {
        if (!title.trim() || title.trim().length < 3) { return Alert.alert("Error", "please Enter a Title at least four character") }
        if (!category) { return Alert.alert("Error", "Please Select a Category first") }
        if (!amount || isNaN(parseInt(amount)) || amount < 0) { return Alert.alert("Error", "Please enter a valid ammount") }
        setisLoading(true)
        try {
            const SendingAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount))
            await fetch(`${url}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    title: title,
                    category: category,
                    amount: SendingAmount
                })
            })
            Alert.alert("Success", "Transaction created Successfully")
            router.back()
        } catch (error) {
            console.log("Error in HandleTransaction: ", error.message)
            Alert.alert("Error", "Error during transaction creation")
        } finally {
            setisLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    router.back()
                }}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Transactions</Text>
                <TouchableOpacity style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
                    disabled={isLoading}
                    onPress={() => {
                        handleGetTransaction()
                    }}
                >
                    <Text style={styles.saveButton}>{isLoading ? "Save" : "Saving"}</Text>
                    {!isLoading && <Ionicons name="checkmark" color={COLORS.primary} size={20} />}
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <View style={styles.typeSelector}>
                    <TouchableOpacity style={[styles.typeButton, isExpense && styles.typeButtonActive]} onPress={() => {
                        setisExpense(true)
                    }}>
                        <Ionicons size={24} name="arrow-down-circle" color={isExpense ? COLORS.white : COLORS.expense} style={styles.typeIcon} />
                        <Text style={[styles.typeButtonText, isExpense && styles.typeButtonActive]}>Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typeButton, !isExpense && styles.typeButtonActive]} onPress={() => {
                        setisExpense(false)
                    }}>
                        <Ionicons size={24} name="arrow-up-circle" color={!isExpense ? COLORS.white : COLORS.income} style={styles.typeIcon} />
                        <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonActive]}>Income</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder='0.00'
                        placeholderTextColor={COLORS.textLight}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setamount}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons color={COLORS.textLight}
                        style={styles.inputIcon}
                        name='create-outline'
                        size={22}
                    />

                    <TextInput
                        value={title}
                        style={styles.input}
                        onChangeText={settitle}
                        placeholder='Enter Title'
                        placeholderTextColor={styles.textLight}
                    />
                </View>
                <View style={styles.sectionTitle}>
                    <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />
                </View>
                <View style={styles.categoryGrid}>
                    {CATEGORIES.map((elem) => (
                        <TouchableOpacity
                        onPress={()=>{
                            setcategory(elem.name)
                        }}
                            key={elem.id}
                            style={[styles.categoryButton, category == elem.name && styles.categoryButtonActive]}>
                            <Ionicons
                                size={20} name={elem.icon} color={category == elem.name ? COLORS.white : COLORS.text}
                                style={styles.categoryIcon}
                            />
                            <Text style={[styles.categoryButtonText, category == elem.name && styles.categoryButtonTextActive]}></Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
        </View>
    )
}

export default create