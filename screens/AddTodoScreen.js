// AddTodoScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addTask } from '../database';

const AddTodoScreen = ({ navigation }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '') {
      addTask(task, (taskId) => {
        console.log(`Task added with ID: ${taskId}`);
        navigation.navigate('Todo List'); // Navigate back to Todo List
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#8fd4a0' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Add Task" onPress={handleAddTask} color="brown" />
    </View>
  );
};

export default AddTodoScreen;







