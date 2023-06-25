import { Skeleton, Table } from "antd";

const SkeletonTable = ({ columns, rowCount }) => {
  
  return (
    <Table
      rowKey="key"
      pagination={false}
      dataSource={[...Array(rowCount)].map((_, index) => ({
        key: `key${index}`,
      }))}
      columns={columns.map((column) => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return <Skeleton active key={column.dataIndex} title={true} paragraph={false} />;
          },
        };
      })}
    />
  );
};

export default SkeletonTable;