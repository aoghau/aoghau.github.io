import React, { useState } from 'react';
import { Card, Divider, Button } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';

export const ToDo = () => {
  const [todos, setTodos] = useState([
    {id: 1, title: 'Todo 1', desc : 'Example', date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'), checked: false},
    {id: 2, title: 'Todo 2', desc : 'Another example', date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'), checked: false}
  ]);
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            onRemove={onRemove} 
            onCheck={onCheck} 
          />) }
      </ul>
    )
  }

  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }

  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      const todo = todos[index];

      todo.color = "teal";
      todo.checked = !todo.checked;      
      todos.splice(index, 1, todo);      
      
      setTodos([...todos]);
    }    
    
  }

  const onSubmit = (title, desc) => {
    if (title == null || desc == null || title.length < 3 || desc.length < 3 || title[0] != title[0].toUpperCase()) {
      alert("Length of the field shouldn't be less than 3 characters. Title should start with a capital letter");
    }
      else {
    const todo = {
      title,
      desc,
      id: idCount,
      checked: false,
      date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -')
    };

    setTodos([...todos, todo]);
    setIdCount(idCount + 1);
    }
  } 

  const removeChecked = () => { 
    
    let i = todos.length;
    while (i--) {
      if (todos[i].checked === true) {
          todos.splice(i, 1);
      }
    }
    
    setTodos([...todos]);
  }



  const numberOfUnChecked = () => { 

    let count = 0;

    let i = todos.length;
    while (i--) {
      if (todos[i].checked === false) {
          count++;
      }
    }

    return count;
  }


  return (
    <Card title={'Todo list'} className="todo-card">
      <ToDoForm onSubmit={onSubmit} />
      <Divider />
      { renderTodoItems(todos) }
      <Divider />
      <p>Number of Unchecked cards: <p className="todo-numberUnchecked">{numberOfUnChecked()}</p></p>
      <Divider />
      <Button htmlType="submit" type="primary" onClick={removeChecked}>Remove checked cards</Button>
    </Card>
  );
}
