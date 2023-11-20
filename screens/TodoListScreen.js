// TodoListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchTasks } from '../database';

const TodoListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const handleEditTask = (taskId) => {
    navigation.navigate('Edit Todo', { taskId });
  };

  const handleDeleteTask = (taskId) => {
    // Implement the logic to delete the task with the given ID
    // For example, you can call a function from your database module
    // For simplicity, let's log a message here
    console.log(`Delete task with ID: ${taskId}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#d3f9e0' }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>{item.task}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleEditTask(item.id)}>
                <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Set up header options for TodoListScreen
TodoListScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => navigation.navigate('Add Todo')}
    >
      <Text style={{ color: 'green' }}>Add</Text>
    </TouchableOpacity>
  ),
});

export default TodoListScreen;










