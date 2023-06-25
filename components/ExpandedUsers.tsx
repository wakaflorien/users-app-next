import { Card } from "antd";
import { FC } from "react";

interface IPropsDataType {
  location: string;
  education: string;
  field: string;
}

const ExpandedUsers: FC<any> = (props: any) => {
  return (
    <div className="flex flex-row flex-wrap gap-10">
      <Card className="w-full h-32 shadow-sm">
        <p>{props.data?.location}</p>
        <p>{props.data?.education}</p>
        <p>{props.data?.study}</p>
      </Card>
    </div>
  );
};
export default ExpandedUsers;
