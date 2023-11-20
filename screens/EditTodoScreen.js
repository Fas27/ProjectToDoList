// EditTodoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTodoScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          const selectedTask = parsedTasks.find((t) => t.id === taskId);
          if (selectedTask) {
            setTask(selectedTask.task);
          }
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEditTask = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        const updatedTasks = parsedTasks.map((t) =>
          t.id === taskId ? { ...t, task } : t
        );
        setTask('');
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        navigation.navigate('Todo List');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <View>
      <Text>Edit Todo</Text>
      <TextInput
        placeholder="Edit task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Save Changes" onPress={handleEditTask} />
    </View>
  );
};

export default EditTodoScreen;

