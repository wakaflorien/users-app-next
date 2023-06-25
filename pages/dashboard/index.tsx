import { FC, useEffect, useState } from "react";
import PageLayout from "../../components/layout";
import { Table, Space, Modal, Row, Col, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CaretDownFilled,
  CaretUpFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import ExpandedUsers from "../../components/ExpandedUsers";
import { Icon } from "@iconify/react";
import CreateForm from "../../components/Form";
import { getAllUsers } from "../api";
import SkeletonTable from "../../components/SkeletonTable";

const { confirm } = Modal;

interface DataType {
  key: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  location: string;
  education: string;
  field: string;
}

const Dashboard: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<DataType[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button className="border-none" onClick={showDeleteConfirm}>
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
    getAllUsers().then((res) => {
      setAllUsers(res);
      setLoading(false);
    });
  }, []);

  const onChange = () => {
    // console.log("pagination", pagination);
  };
  const showModal = (data: any) => {
    console.log("Edit DATA", data);
    setEdit(true);
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setEdit(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEdit(false);
    setIsModalOpen(false);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this User?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
              expandRowByClick={true}
              expandable={{
                expandedRowRender: (record) => <ExpandedUsers data={record} />,
                expandIcon: ({ expanded, onExpand, record }) =>
                  expanded ? (
                    <CaretUpFilled
                      style={{ color: "#798C9A" }}
                      onClick={(e) => onExpand(record, e)}
                    />
                  ) : (
                    <CaretDownFilled
                      style={{ color: "#798C9A" }}
                      onClick={(e) => onExpand(record, e)}
                    />
                  ),
              }}
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
          <CreateForm edit={edit} data={editData} />
        </Modal>
      </main>
    </PageLayout>
  );
};
export default Dashboard;
