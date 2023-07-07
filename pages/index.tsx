import Head from "next/head";
import { Button, Form, Input, notification } from "antd";
import PageLayout from "../components/layout";
import { FC, useState } from "react";
import Link from "next/link";
import { loginUser } from "./api";
import { useRouter } from "next/router";
import * as localforage from "localforage";

const Home: FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    setLoading(true);
    setLoading(true);
    loginUser(values).then((res) => {
      if (res) {
        notification.success({
          message: "Success",
          description: `Login ${values.email} successful`,
        });
        setLoading(false);
        localforage.setItem("AUTH_TOKEN", res.data.accessToken);
        router.push("/dashboard");
      }
    }).catch((err) => {
      setLoading(false);
    })
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
              label="Email"
              name="email"
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
                loading={loading}
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
