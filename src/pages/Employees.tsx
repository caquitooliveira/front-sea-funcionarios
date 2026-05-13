import { Button, message, Input } from "antd";
import "./Employees.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchEmployees } from "../store/employeeSlice";
import EmployeeModal from "../features/employees/components/EmployeeModal";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import { addActivity } from "../services/activityService";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";

type Employee = {
  key?: string;
  name: string;
  role: string;
  status: string;
  cpf?: string;
  rg?: string;
  birthDate?: string;
  gender?: string;
  activity?: string;
  usesEpi?: string;
  id?: number;
};

function Employees() {
  const dispatch = useDispatch<AppDispatch>();

  const { employees } = useSelector((state: RootState) => state.employees);

  const [openModal, setOpenModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees())
      .unwrap()
      .catch(() => {
        message.error("Erro ao carregar funcionários");
      });
  }, [dispatch]);

  const filteredEmployees = employees.filter((employee) => {
    const name = employee.name || "";
    const role = employee.role || "";
    const status = employee.status || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddEmployee = async (employee: Employee) => {
    try {
      await createEmployee({
        name: employee.name,
        role: employee.role,
        status: employee.status,
        cpf: employee.cpf,
        rg: employee.rg,
        birthDate: employee.birthDate,
        gender: employee.gender,
        activity: employee.activity,
        usesEpi: employee.usesEpi,
      });

      message.success("Funcionário adicionado com sucesso");
      addActivity("Funcionário adicionado", employee.name);
      dispatch(fetchEmployees());
    } catch {
      message.error("Erro ao adicionar funcionário");
    }
  };

  const handleDeleteEmployee = async (key?: string) => {
    if (!key) return;

    try {
      await deleteEmployee(key);

      message.success("Funcionário excluído com sucesso");

      addActivity(
        "Funcionário removido",
        employees.find((e) => e.key === key)?.name || ""
      );

      dispatch(fetchEmployees());
    } catch {
      message.error("Erro ao excluir funcionário");
    }
  };

  const handleEditEmployee = async (updatedEmployee: Employee) => {
    if (!updatedEmployee.key) return;

    try {
      await updateEmployee(updatedEmployee.key, {
        name: updatedEmployee.name,
        role: updatedEmployee.role,
        status: updatedEmployee.status,
        cpf: updatedEmployee.cpf,
        rg: updatedEmployee.rg,
        birthDate: updatedEmployee.birthDate,
        gender: updatedEmployee.gender,
        activity: updatedEmployee.activity,
        usesEpi: updatedEmployee.usesEpi,
      });

      message.success("Funcionário atualizado com sucesso");
      addActivity("Funcionário editado", updatedEmployee.name);

      setEditingEmployee(null);
      setOpenModal(false);
      dispatch(fetchEmployees());
    } catch {
      message.error("Erro ao atualizar funcionário");
    }
  };

  return (
    <div className="page-employees">
      <div className="header-employees">
        <h1>Funcionários</h1>

        <Button type="primary" onClick={() => setOpenModal(true)}>
          Adicionar Funcionário
        </Button>
      </div>

      <Input
        placeholder="Pesquisar funcionários"
        size="large"
        style={{ marginBottom: 20 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="employees-list">
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.key}
            employee={employee}
            onEdit={() => {
              setEditingEmployee(employee);
              setOpenModal(true);
            }}
            onDelete={() => handleDeleteEmployee(employee.key)}
          />
        ))}
      </div>

      <EmployeeModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingEmployee(null);
        }}
        onAddEmployee={handleAddEmployee}
        onEditEmployee={handleEditEmployee}
        editingEmployee={editingEmployee}
      />
    </div>
  );
}

export default Employees;