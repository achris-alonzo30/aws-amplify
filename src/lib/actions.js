import { client } from "../App";
import { listTodos } from "../graphql/queries";
import { deleteTodo, updateTodo, createTodo } from "../graphql/mutations";


export const fetchTodo = async () => {
  return await client.graphql({
    query: listTodos,
  });
}

export const addTodo = async (name, description) => {
  return await client.graphql({
    query: createTodo,
    variables: {
      input: {
        name,
        description,
      },
    },
  });
};

export const deleteTodoItem = async (id) => {
  return await client.graphql({
    query: deleteTodo,
    variables: {
      input: {
        id,
      },
    },
  });
};

export const updateTodoItem = async (id, name, description) => {
  return await client.graphql({
    query: updateTodo,
    variables: {
      input: {
        id,
        name,
        description,
      },
    },
  });
};

export const fetchToBeUpdatedTodos = async (id) => {
  return await client.graphql({
    query: listTodos,
    variables: {
      input: {
        id,
      },
    },
  });
};
