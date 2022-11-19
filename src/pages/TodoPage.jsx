import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleAddTodo() {
    if (inputValue.length === 0) return;
    setTodos((prevTodos) => {
      return [
        {
          id: uuidv4(),
          title: inputValue,
          isDone: false,
        },
        ...prevTodos,
      ];
    });

    setInputValue('');
  }

  function handleToggleDone(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  }

  function handleEditMode({ id, isEdit }) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return todo;
      });
    });
  }

  function handleSave({ id, title }) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false,
          };
        }
        return todo;
      });
    });
  }

  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleAddTodo}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleEditMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos}/>
    </div>
  );
};

export default TodoPage;
