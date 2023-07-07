import Head from "next/head";
import Link from "next/link";
import { Layout, Menu, Button, theme, Spin } from "antd";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import * as localforage from "localforage";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;
export const siteTitle = "Users management app";

export default function PageLayout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
  userContext?: any;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});

  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    localforage
      .getItem("AUTH_TOKEN")
      .then((res: any) => {
        if (!res) {
        } else {
          const userLogged: any = jwt.decode(res)
          setUser(userLogged)
          localforage.setItem('roles', user.roles)
          setLoading(false);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        localforage.clear();
        router.push("/");
      });
  }, []);

  return (
    <>
      <div className="">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className="">
          {home ? (
            <div className="flex flex-row justify-between h-20 p-8 bg-white shadow-sm">
              <div>
                <Link href="/" className="text-2xl font-bold">
                  Users App
                </Link>
              </div>
              <div className="flex gap-2">
                <Link href="/" className="text-lg font-bold">
                  Login
                </Link>
                <Link href="/signup" className="text-lg font-bold">
                  Signup
                </Link>
              </div>
            </div>
          ) : (
            <Layout>
              <Header
                style={{
                  padding: 12,
                  height: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <span className="text-white text-lg font-bold">
                  <Link href="/dashboard">Users App Dashboard</Link>
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-lg">
                    {user.email}
                  </span>
                  <span className="font-bold">
                    <Button className="h-10 w-32">
                      <Link href="/">Logout</Link>
                    </Button>
                  </span>
                </div>
              </Header>
            </Layout>
          )}
        </header>
        {home ? (
          <main>{children}</main>
        ) : (
          <>
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "white",
                }}
              >
                <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  items={[
                    {
                      key: "1",
                      icon: <Icon icon="ph:users-thin" />,
                      label: "Users",
                    },
                  ]}
                />
                <Button
                  type="text"
                  icon={
                    collapsed ? (
                      <Icon icon="ion:chevron-forward-sharp" />
                    ) : (
                      <Icon icon="ic:sharp-arrow-back-ios" />
                    )
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 24,
                    height: 24,
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                />
              </Sider>
              <Layout>
                <Content
                  style={{
                    padding: "24px 16px",
                    minHeight: "90vh",
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Layout>
          </>
        )}
      </div>
    </>
  );
}
