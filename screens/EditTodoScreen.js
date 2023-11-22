// EditTodoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todoList.db');

const EditTodoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId } = route.params;
  const [task, setTask] = useState('');

  useEffect(() => {
    // Fetch the task details when the component mounts
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE id = ?',
        [taskId],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            setTask(_array[0].task);
          }
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  };

  const handleUpdateTask = () => {
    // Update the task in the database
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tasks SET task = ? WHERE id = ?',
        [task, taskId],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            // If the task is successfully updated, navigate back to the TodoList screen
            navigation.goBack();
          }
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  };

  return (
    <View>
      <Text>Edit Todo Screen</Text>
      <TextInput
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder="Edit your task"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button onPress={handleUpdateTask} title="Update Task" />
    </View>
  );
};

export default EditTodoScreen;


