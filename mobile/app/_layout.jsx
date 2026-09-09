import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";

// ✅ Read the publishable key from environment variables
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// ✅ Add a safety check
if (!publishableKey) {
  console.error('❌ Clerk publishable key is missing! Check your environment variables.');
}

export default function RootLayout() {
  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={publishableKey}  // ✅ THIS WAS MISSING!
    >
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark"/>
    </ClerkProvider>
  );
}