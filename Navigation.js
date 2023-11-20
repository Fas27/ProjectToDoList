// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AddTodoScreen from './screens/AddTodoScreen';
import TodoListScreen from './screens/TodoListScreen';
import EditTodoScreen from './screens/EditTodoScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TodoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Todo List" component={TodoListScreen} />
      <Stack.Screen name="Edit Todo" component={EditTodoScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo List" component={TodoStack} />
        <Tab.Screen name="Add Todo" component={AddTodoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;




