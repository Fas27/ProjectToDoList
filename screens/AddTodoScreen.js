// AddTodoScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addTask } from '../database';

const AddTodoScreen = () => {
  const [task, setTask] = useState('');

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      addTask(task, 0); // Assuming "completed" is initially set to 0
      setTask(''); // Clear the input field after adding a task
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

export default AddTodoScreen;



