import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import {  useRouter } from 'expo-router'
import { Alert, FlatList, Image, RefreshControl, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from "../../components/SignOutButton"
import { useTransaction } from '../../hooks/useHooks'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader'
import { styles } from '../../assets/styles/home.styles'
import { Ionicons } from "@expo/vector-icons"
import BalanceCard from '../../components/BalanceCard'
import TransactionItem from '../../components/TransactionItem'
import NoTransactionFound from '../../components/NoTransactionFound'

export default function Page() {
  const router=useRouter()
  const [refreshing, setrefreshing] = useState(false)
  const { user } = useUser()
  const { isLoading, summary, transactions, deleteTransaction, loadData } = useTransaction(user.id)
  useEffect(() => {
    const runLoadeData = async () => {
      await loadData()
    }
    runLoadeData()
  }, [loadData])

 const  refreshTransaction =async()=>{
  setrefreshing(true)
  await loadData()
  setrefreshing(false)
 }

  const handleDelete = async (id) => {
    try {
      Alert.alert("Delete", "  Are You Sure", [
        { text: "Cancle", style: "cancel" },
        {
          text: "Delete", style: "destructive", onPress: async () => { await deleteTransaction(id) }
        }
      ])
    } catch (error) {
      Alert.alert("Error", "Error occured during transactiondeletion")
      console.log("error in handleTransaction: ",error.message)
    }
  }
  if (isLoading) {
    return <PageLoader />
  }


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              resizeMode="contain"
              style={styles.headerLogo}
            />
            <View styles={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>{
              router.push("/create")
            }}>
              <Ionicons name="add-circle-outline" size={22} color={"#ffffff"} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        <BalanceCard summary={summary} />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        style={styles.transactionsList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.transactionsListContent}
        ListEmptyComponent={<NoTransactionFound/>}
        renderItem={({ item }) => (
          <TransactionItem
            item={item}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshTransaction} />}
      />
    </View>
  )
}