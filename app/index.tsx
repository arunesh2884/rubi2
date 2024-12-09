import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>Welcome to the App!</Text>
            <Link href="/todo" style={{ fontSize: 18, color: "blue" }}>Go to To-Do List</Link>
        </View>
    );
}
