import { View, Text, StyleSheet } from "react-native";
import { Button } from '@/components/Button'
import { useAuth } from "@clerk/clerk-expo";

export default function Home() {
    const { signOut } = useAuth()

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Olá, Usuário</Text>
            <Button
                icon="exit"
                title={"Sair"}
                onPress={() => signOut()}
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