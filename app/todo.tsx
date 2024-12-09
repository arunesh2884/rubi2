import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

export default function TodoScreen() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask("");
        }
    };

    const toggleCompletion = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a task"
                value={task}
                onChangeText={setTask}
            />
            <Button title="Add Task" onPress={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.taskContainer}>
                        <TouchableOpacity onPress={() => toggleCompletion(index)}>
                            <Text
                                style={[
                                    styles.task,
                                    item.completed && {
                                        textDecorationLine: "line-through",
                                        color: "gray",
                                    },
                                ]}
                            >
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                        <Button title="Delete" onPress={() => deleteTask(index)} />
                    </View>
                )}
            />
            {/* AdMob Banner Ad */}
            <BannerAd
                unitId={TestIds.BANNER} // Replace with your Ad Unit ID in production
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8, borderRadius: 4 },
    taskContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    task: { fontSize: 18, padding: 8 },
});
