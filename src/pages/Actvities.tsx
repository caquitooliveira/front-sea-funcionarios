import { Table, Tag } from "antd";
import { getActivities } from "../services/activityService";

function Activities() {
  const activities = getActivities();

  const columns = [
    {
      title: "Atividade",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Usuário",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="blue">Concluído</Tag>,
    },
  ];

  return (
    <div className="activities-container">
      <h1 className="activities-title">
        Atividades
      </h1>

      <Table
        columns={columns}
        dataSource={activities}
        rowKey="id"
      />
    </div>
  );
}

export default Activities;