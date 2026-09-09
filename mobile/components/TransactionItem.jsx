import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'
import { formatDate } from '../lib/utils'
const CatagoryIcons={
  Income:"cash",
  transportation:"car",
  entertainment:"film",
  others:"ellipsis-horiontal"
}

const TransactionItem = ({item ,onDelete}) => {
  const isIncom =parseFloat(item.amount).toFixed(2)>0
  const iconName= CatagoryIcons[item.category ] || "pricetag-outline"
  return (
    <View  style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={iconName} size={22} color={isIncom? COLORS.income : COLORS.expense} />
        </View>
        <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount,{color: isIncom ? COLORS.income : COLORS.expense}]}>{isIncom ? "+ " : "- "}₹{ Math.abs(parseFloat(item.amount).toFixed(2))}</Text>
          <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={22} color={COLORS.expense}/>
      </TouchableOpacity>
    </View>
  )
}

export default TransactionItem