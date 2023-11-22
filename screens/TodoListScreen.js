// TodoListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchTasks, deleteTask } from '../database';

const TodoListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks((tasks) => {
      setTasks(tasks);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks((tasks) => {
        setTasks(tasks);
      });
    }, [])
  );

  const handleDeleteTask = (taskId) => {
    console.log(`Deleting task with ID: ${taskId}`);

    deleteTask(taskId, () => {
      console.log(`Task with ID ${taskId} deleted successfully`);

      // Update the task list after deletion
      fetchTasks((tasks) => {
        setTasks(tasks);
      });
    });
  };

  const handleEditTask = (taskId) => {
    navigation.navigate('Edit Todo', { taskId });
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
                <View style={{ backgroundColor: 'brown', padding: 5, borderRadius: 5, marginRight: 10 }}>
                  <Text style={{ color: 'white' }}>Edit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <View style={{ backgroundColor: 'brown', padding: 5, borderRadius: 5 }}>
                  <Text style={{ color: 'white' }}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoListScreen;












