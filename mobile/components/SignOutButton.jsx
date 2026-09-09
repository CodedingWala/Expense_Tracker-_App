import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants/colors'
import { styles } from '../assets/styles/home.styles'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    try {
      Alert.alert("Logout", "Are You Sure", [
        { text: "Cancel", style: "cancel" },
        {
          text: "LogOut", style: "destructive", onPress: async () => {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/'))
          }
        },
      ])
    } catch (err) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
      <Ionicons name="log-out" size={22} color={COLORS.text} />
    </TouchableOpacity>
  )
}