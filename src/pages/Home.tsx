import axios from "axios";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import TodoList from "../components/TodoList";

const url = "https://635182073e9fa1244e6083a6.mockapi.io/todos";

const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodos = async () => {
    try {
      const { data } = await axios.get<TodoType[]>(url);
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo: AddFn = async (text) => {
    const newTodo = {
      task: text,
      isDone: false,
    };
    try {
      await axios.post(url, newTodo);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo: ToggleFn = async (item) => {
    try {
      await axios.put(`${url}/${item.id}`, { ...item, isDone: !item.isDone });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo: DeleteFn = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="main">
      <InputForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default Home;
// // Declaring type of props - see "Typing Component Props" for more examples
// type AppProps = {
//   message: string;
// }; /* use `interface` if exporting so that consumers can extend */

// // Easiest way to declare a Function Component; return type is inferred.
// const App = ({ message }: AppProps) => <div>{message}</div>;

// // you can choose annotate the return type so an error is raised if you accidentally return some other type
// const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

// // you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
// const App = ({ message }: { message: string }) => <div>{message}</div>;
