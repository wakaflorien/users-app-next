import { FC, useState } from "react";
import PageLayout from "../components/layout";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Form, Input, Select, notification } from "antd";
import { createUser } from "./api";
import { useRouter } from "next/router";

const { Option } = Select;
const Signup: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onFinish = (values: any) => {
    setLoading(true);
    createUser(values).then((res) => {
      if (res) {
        notification.success({
          message: "Success",
          description: `User ${values.email}`,
        });
        setLoading(false);
        router.push("/login")
      }
      form.resetFields();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <PageLayout home>
      <main className="flex items-center justify-center">
        <div className="w-1/3 p-10 border rounded-md my-12">
          <h2 className="font-bold py-8">Signup To continue</h2>
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
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input
                size="large"
                onChange={(e) => {
                  e.target.value.toLowerCase();
                }}
              />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="lastname"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input
                size="large"
                onChange={(e) => {
                  e.target.value.toLowerCase();
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
                onChange={(e) => {
                  e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please input your gender!" }]}
            >
              <Select size="large">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: false, message: "Please input your location!" },
              ]}
            >
              <Input
                size="large"
                onChange={(e) => {
                  e.target.value.toLowerCase();
                }}
              />
            </Form.Item>

            <Form.Item
              label="Education"
              name="education"
              rules={[
                { required: true, message: "Please input your education!" },
              ]}
            >
              <Select size="large">
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
              <Select size="large">
                <Option value="IT">Information Technology</Option>
                <Option value="construction">Construction</Option>
                <Option value="math">Math</Option>
                <Option value="law">Law</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                onChange={(e) => {
                  e.target.value.toLowerCase();
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
          <span className="flex items-center gap-2">
            <Icon icon="ic:round-arrow-back" />
            <Link href="/" className="text-lg font-bold">
              Back To Login
            </Link>
          </span>
        </div>
      </main>
    </PageLayout>
  );
};
export default Signup;
