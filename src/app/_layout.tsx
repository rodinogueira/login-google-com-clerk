import { useEffect } from "react";
import { Slot, router } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator } from 'react-native'
import { tokenCache } from "@/storage/tokenCache";

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
    .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    // Redireciona para /auth se o usuário estiver autenticado
    useEffect(() => {
        if (!isLoaded) return

        if (isSignedIn) {
            router.replace("/(auth)");
        } else {
            router.replace("/(public)");
        }
    }, [isSignedIn]);


    return isLoaded ? <Slot /> : (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    );
}

export default function Layout() {
    // Certifique-se de retornar o JSX aqui
    return (
        <ClerkProvider
            publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
            tokenCache={tokenCache}
        >
            {/* Encapsula InitialLayout no ClerkProvider */}
            <InitialLayout />
        </ClerkProvider>
    );
}
