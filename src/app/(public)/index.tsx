import { View, Text, StyleSheet } from "react-native";
import { Button } from '@/components/Button'
import * as WebBrowser from "expo-web-browser"
import { useState, useEffect } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const googleOAuth = useOAuth({ strategy: "oauth_google" })

    async function onGoogleSignIn() {
        try {
            setIsLoading(true)

            const redirectUrl = Linking.createURL("/(auth)")

            const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl })

            if (oAuthFlow.authSessionResult?.type === "success") {
                if (oAuthFlow.setActive) {
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
                }
            } else {
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        WebBrowser.warmUpAsync()

        return () => {
            WebBrowser.coolDownAsync()
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Entrar</Text>
            <Button
                icon="logo-google"
                title={"Entrar com google"}
                isLoading={isLoading}
                onPress={onGoogleSignIn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        alignItems: "center",
        gap: 12
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
})