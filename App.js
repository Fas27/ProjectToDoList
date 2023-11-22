// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setupDatabase } from './database';
import AddTodoScreen from './screens/AddTodoScreen';
import TodoListScreen from './screens/TodoListScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    // Call setupDatabase when the app starts
    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo List" component={TodoListScreen} />
        <Tab.Screen name="Add Todo" component={AddTodoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

