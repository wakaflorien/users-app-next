import { FC, useState } from "react";
import { Button, Form, Input, Select, notification } from "antd";
import { createUser } from "../pages/api";

const { Option } = Select;
interface IProps {
  edit?: boolean;
  data?: any;
}
const CreateForm: FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
    setLoading(true);
    createUser(values).then((res) => {
      if (res) {
        notification.success({
          message: "Success",
          description: `${res.message}`,
        });
        setLoading(false);
      }
      form.resetFields();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Firstname"
        name="firstname"
        rules={[{ required: true, message: "Please input your firstname!" }]}
      >
        <Input
          size="large"
          defaultValue={props.edit && props.data.firstname}
          value={props.edit && props.data.firstname}
          onChange={(e) => {
            props.edit && e.target.value.toLowerCase();
          }}
        />
      </Form.Item>
      <Form.Item
        label="Lastname"
        name="lastname"
        rules={[{ required: true, message: "Please input your lastname!" }]}
      >
        <Input
          size="large"
          defaultValue={props.edit && props.data.lastname}
          value={props.edit && props.data.lastname}
          onChange={(e) => {
            props.edit && e.target.value.toLowerCase();
          }}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          size="large"
          defaultValue={props.edit && props.data.email}
          value={props.edit && props.data.email}
          onChange={(e) => {
            props.edit && e.target.value;
          }}
        />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please input your gender!" }]}
      >
        <Select size="large" defaultValue={props.edit && props.data.gender}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: false, message: "Please input your location!" }]}
      >
        <Input
          size="large"
          defaultValue={props.edit && props.data.location}
          value={props.edit && props.data.location}
          onChange={(e) => {
            props.edit && e.target.value.toLowerCase();
          }}
        />
      </Form.Item>

      <Form.Item
        label="Education"
        name="education"
        rules={[{ required: true, message: "Please input your education!" }]}
      >
        <Select size="large" defaultValue={props.edit && props.data.education}>
          <Option value="primary">Primary</Option>
          <Option value="secondary">Secondary</Option>
          <Option value="bachelors">Bachelors</Option>
          <Option value="masters">Masters</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Field of study"
        name="study"
        rules={[{ required: true, message: "Please input your study!" }]}
      >
        <Select size="large" defaultValue={props.edit && props.data.study}>
          <Option value="IT">Information Technology</Option>
          <Option value="construction">Construction</Option>
          <Option value="math">Math</Option>
          <Option value="law">Law</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          size="large"
          defaultValue={props.edit && props.data.password}
          value={props.edit && props.data.password}
          onChange={(e) => {
            props.edit && e.target.value.toLowerCase();
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="h-10 w-32 bg-gradient-to-r from-purple-500 to-pink-500"
          loading={loading}
        >
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreateForm;
