import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from '../assets/styles/auth.styles'
import { COLORS } from '../constants/colors'

const PageLoader = () => {
    
  return (
    <View style={styles.container}>
     <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  )
}

export default PageLoader