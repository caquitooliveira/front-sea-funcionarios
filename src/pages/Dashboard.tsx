import { Card, Col, Row, Spin, message } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchEmployees } from "../store/employeeSlice";
import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { employees, loading } = useSelector(
    (state: RootState) => state.employees
  );

  useEffect(() => {
    dispatch(fetchEmployees())
      .unwrap()
      .catch(() => {
        message.error("Erro ao carregar dashboard");
      });
  }, [dispatch]);

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Ativo"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inativo"
  ).length;

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Resumo geral dos funcionários cadastrados no sistema.</p>
        </div>
      </div>


      <Row gutter={[20, 20]}>
        <Col xs={24} md={8}>
          <Card className="dashboard-card">
            <div className="card-content">
              <div>
                <span className="card-label">Total</span>
                <h2>Total de Funcionários</h2>
                <strong className="total-number">{totalEmployees}</strong>
              </div>

              <div className="card-icon total-icon">
                <TeamOutlined />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="dashboard-card">
            <div className="card-content">
              <div>
                <span className="card-label">Ativos</span>
                <h2>Funcionários Ativos</h2>
                <strong className="active-number">{activeEmployees}</strong>
              </div>

              <div className="card-icon active-icon">
                <CheckCircleOutlined />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="dashboard-card">
            <div className="card-content">
              <div>
                <span className="card-label">Inativos</span>
                <h2>Funcionários Inativos</h2>
                <strong className="inactive-number">{inactiveEmployees}</strong>
              </div>

              <div className="card-icon inactive-icon">
                <CloseCircleOutlined />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;