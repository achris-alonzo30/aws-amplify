import { useState, useEffect } from "react";
import { Button, Modal, Form, Input } from "antd";
import { fetchToBeUpdatedTodos, updateTodoItem } from "../lib/actions";

export const EditTodoForm = ({ id }) => {
  // Corrected to destructure id from props
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todo, setTodo] = useState(null); // Initialized as null

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetchToBeUpdatedTodos(id);
      setTodo(res.data.listTodos.items[0]); // Assuming the fetched todo is the first item
    }
    fetchTodos();
  }, [id]);

  useEffect(() => {
    if (todo) {
      form.setFieldsValue({
        name: todo.name,
        description: todo.description,
      });
    }
  }, [todo, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log(values);
    await updateTodoItem(id, values.name, values.description); // Assuming id is available in the component scope

    handleOk();
    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button onClick={showModal}>Edit</Button>
      <Modal
        title="Update Todo"
        visible={isModalOpen} // Corrected to use visible prop
        onOk={() => form.submit()} // Corrected to use a function that submits the form
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Input the todo name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Input the todo description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
