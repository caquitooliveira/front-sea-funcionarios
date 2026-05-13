import "./EmployeeCard.css";

type Employee = {
  name: string;
  role: string;
  status: string;
  cpf?: string;
};

type Props = {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
};

function EmployeeCard({ employee, onEdit, onDelete }: Props) {
  return (
    <div className="employee-card">
      <div>
        <h3>{employee.name}</h3>

        <div className="employee-tags">
          <span>{employee.cpf || "000.000.000-00"}</span>
          <span>{employee.status}</span>
          <span>{employee.role}</span>
        </div>
      </div>

      <div className="employee-card-actions">
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Excluir</button>
      </div>
    </div>
  );
}

export default EmployeeCard;