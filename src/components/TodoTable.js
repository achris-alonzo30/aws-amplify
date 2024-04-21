import { fetchTodo } from "../lib/actions";
import { useState, useEffect } from "react";
import { refactorDate } from "../lib/utils";
import { Button, Space, Table } from "antd";
import { EditTodoForm } from "./EditTodoForm";
import { deleteTodoItem } from "../lib/actions";

const { Column } = Table;

export const TodoTable = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetchTodo();
      setTodos(res.data.listTodos.items);
    }

    fetchTodos();
  }, [todos]);

  return (
    <Table dataSource={todos} pagination={false}>
      <Column 
        title="Date" 
        dataIndex="createdAt" 
        key="createdAt" 
        render={(_, record) => (
          <Space size="middle">
            <p className="text-muted-foreground">{refactorDate(record.createdAt)}</p>
          </Space>
        )}/>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column
        title="Action"
        key="id"
        render={(_, record) => (
          <Space size="middle">
            <EditTodoForm id={record.id}/>
            <Button danger onClick={() => deleteTodoItem(record.id)}>Delete</Button>
          </Space>
        )}
      />
    </Table>
  );
};
