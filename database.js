// database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todoList.db');

const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, completed INTEGER);',
      [],
      () => console.log('Table created successfully'),
      (_, error) => console.error('Error creating table:', error)
    );
  });
};

const addTask = (task, completed) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO tasks (task, completed) VALUES (?, ?);',
        [task, completed],
        (_, result) => console.log('Task added successfully'),
        (_, error) => console.error('Error adding task:', error)
      );
    },
    null,
    () => console.log('Transaction completed successfully')
  );
};

const fetchTasks = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM tasks;',
        [],
        (_, result) => callback(result.rows._array),
        (_, error) => console.error('Error fetching tasks:', error)
      );
    },
    null,
    () => console.log('Transaction completed successfully')
  );
};

export { setupDatabase, addTask, fetchTasks };
