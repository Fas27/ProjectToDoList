// Database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todoList.db');

export const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, completed INTEGER)',
      [],
      () => console.log('Table created successfully'),
      (_, error) => console.error('Error creating table:', error)
    );
  });
};

export const fetchTasks = (callback) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM tasks', [], (_, result) => {
      const tasks = result.rows._array;
      callback(tasks);
    });
  });
};

export const addTask = (task, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (task, completed) VALUES (?, ?)',
      [task, 0],
      (_, result) => {
        const taskId = result.insertId;
        callback(taskId);
      },
      (_, error) => console.error('Error adding task:', error)
    );
  });
};

export const fetchTaskById = (taskId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM tasks WHERE id = ?',
      [taskId],
      (_, result) => {
        const taskDetails = result.rows.item(0);
        callback(taskDetails);
      },
      (_, error) => console.error('Error fetching task details:', error)
    );
  });
};

export const updateTask = (taskId, updatedTask, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE tasks SET task = ? WHERE id = ?',
      [updatedTask, taskId],
      () => {
        callback();
      },
      (_, error) => console.error('Error updating task:', error)
    );
  });
};

export const deleteTask = (taskId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM tasks WHERE id = ?',
      [taskId],
      () => {
        callback();
      },
      (_, error) => console.error('Error deleting task:', error)
    );
  });
};
