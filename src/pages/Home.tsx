import axios from "axios";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import TodoList from "../components/TodoList";

const url = "https://635182073e9fa1244e6083a6.mockapi.io/todos";
interface TodoType {
  id: string;
}
const Home = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div className="main">
      <InputForm />
      <TodoList />
    </div>
  );
};

export default Home;
