
import React, { useState } from "react";
import { addTodo } from "../lib/actions";
import { Button, Modal, Form, Input } from "antd";

export const AddTodoForm = () => {
 const [form] = Form.useForm();
 const [isModalOpen, setIsModalOpen] = useState(false);

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
    await addTodo(values.name, values.description);

    handleOk();
    onReset();
 };

 const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
 };

 return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Todo
      </Button>
      <Modal
        title="Add New Todo"
        visible={isModalOpen} // Corrected to use visible prop
        onOk={() => form.submit()} // Corrected to use a function that submits the form
        onCancel={handleCancel}
        okText="Create"
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
