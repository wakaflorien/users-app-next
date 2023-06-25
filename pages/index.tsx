import Head from "next/head";
import { Button, Form, Input } from "antd";
import PageLayout from "../components/layout";
import { FC } from "react";
import Link from "next/link";

const Home: FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <PageLayout home>
      <Head>
        <title>Users App</title>
        <meta name="description" content="Users management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center">
        <div className="w-1/3 p-10 border rounded-md my-12">
          <h2 className="font-bold py-8">Login To continue</h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="h-10 w-32 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <span>
            Dont have an account ?{" "}
            <Link href="/signup" className="text-lg font-bold">
              Signup
            </Link>
          </span>
        </div>
      </main>
    </PageLayout>
  );
};
export default Home;
