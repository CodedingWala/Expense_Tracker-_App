import { View, Text } from 'react-native'
import {useSafeAreaInsets}from "react-native-safe-area-context"
import { COLORS } from '../constants/colors'
const SafeScreen = ({children}) => {
    const inset=useSafeAreaInsets()
  return (
    <View style={{paddingTop:inset.top,paddingLeft:inset.left,paddingRight:inset.right, backgroundColor:COLORS.background ,flex:1}}>
      {children}
    </View>
  )
}

export default SafeScreen;