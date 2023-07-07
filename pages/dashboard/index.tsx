import { FC, useEffect, useState } from "react";
import PageLayout from "../../components/layout";
import {
  Table,
  Space,
  Modal,
  Row,
  Col,
  Input,
  notification,
  Select,
  Button,
  Form,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  CaretDownFilled,
  CaretUpFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import SkeletonTable from "../../components/SkeletonTable";
import { createUser, deleteUser, getAllUsers } from "../api";
import { useRouter } from "next/router";
import localforage from "localforage";

const { confirm } = Modal;

interface DataType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  location: string;
  education: string;
  field: string;
}

const { Option } = Select;

const Dashboard: FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({})

  const router = useRouter();

  const columns: ColumnsType<DataType> = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      sorter: (a, b) => a.firstname.length - b.firstname.length,
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
      sorter: (a, b) => a.lastname.length - b.lastname.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
      filters: [
        {
          text: "BSc",
          value: "Bachelor",
        },
        {
          text: "MSc",
          value: "Masters",
        },
        {
          text: "PR",
          value: "Primary",
        },
        {
          text: "SS",
          value: "Secondary",
        },
      ],
      onFilter: (value: any, record) =>
        record.education.toLowerCase().indexOf(value.toLowerCase()) === 0,
      sorter: (a, b) => a.education.length - b.education.length,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Field of Study",
      dataIndex: "study",
      key: "study",
      filters: [
        {
          text: "IT",
          value: "IT",
        },
        {
          text: "Math",
          value: "Math",
        },
        {
          text: "Law",
          value: "Law",
        },
        {
          text: "Construction",
          value: "Construction",
        },
      ],
      onFilter: (value: any, record: any) =>
        record.study.toLowerCase().indexOf(value.toLowerCase()) === 0,
      sorter: (a: any, b: any) => a.study.length - b.study.length,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],
      onFilter: (value: any, record) => record.gender.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="border-none"
            onClick={() => showDeleteConfirm(record._id)}
          >
            <Icon icon="mdi:delete" color="red" height={20} />
          </Button>
          <Button className="border-none" onClick={() => showModal(record)}>
            <Icon icon="lucide:edit" height={20} />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (loading) {
      localforage
      .getItem("roles")
      .then((res: any) => {
        if (!res) {
          localforage.clear();
          router.push("/");
        } else {
          const userLogged: any = res
          setUser(userLogged)
          setLoading(false);
        }
      })
      .catch((err: any) => {
        localforage.clear();
        router.push("/");
      });
      getAllUsers().then((res) => {
        setAllUsers(res);
        setLoading(false);
      });
    }
  }, [loading]);

  console.log("User info", user);


  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const showModal = (data: any) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Are you sure delete this User?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setLoading(true);
        deleteUser(id).then((res) => {
          notification.success({
            message: "Success",
            description: `User Deleted!`,
          });
          setLoading(false);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onFinish = (values: any) => {
    setLoading(true);
    createUser(values).then((res) => {
      if (res) {
        notification.success({
          message: "Success",
          description: `User ${values.email}`,
        });
        setLoading(false);
      }
      form.resetFields();
      setLoading(false);
      setIsModalOpen(false);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch = (value: string) => {
    let results: DataType[] = [];
    if (value?.length > 0) {
      for (var i = 0; i < allUsers.length; i++) {
        // Looping in the array
        // Normalize both query and data in the array & push results into the results.
        if (
          allUsers[i]?.firstname
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          allUsers[i]?.lastname?.toLowerCase()?.includes(value.toLowerCase()) ||
          allUsers[i]?.email?.toString()?.includes(value.toLowerCase())
        ) {
          results.push(allUsers[i]);
          setAllUsers(results);
        } else {
          setAllUsers(results);
        }
      }
    } else {
      setLoading(true);
    }
  };

  return (
    <PageLayout>
      <main>
        <section className="my-8">
          <Row className="extra-nodes" justify="space-between" align="middle">
            <Col span={8}>
              <Row justify="start" gutter={[8, 8]}>
                <Col key={2}>
                  <Input
                    size="large"
                    placeholder="Search by Firstname, Lastname and Email"
                    className="my-4 h-10 w-96"
                    onChange={(e) => onSearch(e.target.value)}
                    suffix={<Icon icon="uiw:search" color="gray" />}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row justify="end" gutter={[8, 8]}>
                <Col key={3}>
                  <Button
                    key={0}
                    className="my-4 h-10 w-fit-content flex gap-2 items-center justify-center font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500"
                    onClick={showModal}
                  >
                    <Icon icon="mdi:add" color="white" height={20} />
                    Add New User
                    <span></span>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {loading ? (
            <SkeletonTable columns={columns} rowCount={5} />
          ) : (
            <Table
              columns={columns}
              dataSource={allUsers}
              rowKey={"_id"}
              size={"large"}
              pagination={{
                total: allUsers?.length,
                defaultCurrent: 1,
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
              }}
              onChange={onChange}
            />
          )}
        </section>
        <Modal
          title="Add New User"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
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
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </PageLayout>
  );
};
export default Dashboard;
