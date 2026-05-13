import { Button, Col, Form, Input, Modal, Radio, Row, Select } from "antd";
import { useEffect } from "react";
import "./EmployeeModal.css"

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

type Props = {
  open: boolean;
  onClose: () => void;
  onAddEmployee: (employee: Employee) => void;
  editingEmployee: Employee | null;
  onEditEmployee: (employee: Employee) => void;
};

function EmployeeModal({
  open,
  onClose,
  onAddEmployee,
  editingEmployee,
  onEditEmployee,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
  if (!open) return;

  if (editingEmployee) {
    form.setFieldsValue(editingEmployee);
  } else {
    form.resetFields();
  }
}, [open, editingEmployee, form]);

  const handleFinish = (values: Omit<Employee, "key">) => {
    if (editingEmployee) {
      onEditEmployee({
        ...editingEmployee,
        ...values,
      });
    } else {
      const newEmployee: Employee = {
        key: Date.now().toString(),
        ...values,
      };

      onAddEmployee(newEmployee);
    }

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={editingEmployee ? "Editar Funcionário" : "Adicionar Funcionário"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
    >
      <Form
  form={form}
  layout="vertical"
  onFinish={handleFinish}
>
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Digite o nome do funcionário" }]}
      >
        <Input placeholder="Digite o nome do funcionário" />
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item label="CPF" name="cpf">
        <Input placeholder="Digite o CPF" />
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item label="RG" name="rg">
        <Input placeholder="Digite o RG" />
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item label="Data de Nascimento" name="birthDate">
        <Input type="date" />
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item label="Sexo" name="gender">
        <Radio.Group>
          <Radio value="Feminino">Feminino</Radio>
          <Radio value="Masculino">Masculino</Radio>
        </Radio.Group>
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item
        label="Cargo"
        name="role"
        rules={[{ required: true, message: "Digite o cargo do funcionário" }]}
      >
        <Input placeholder="Digite o cargo" />
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Selecione o status" }]}
      >
        <Select
          placeholder="Selecione o status"
          options={[
            { value: "Ativo", label: "Ativo" },
            { value: "Inativo", label: "Inativo" },
          ]}
        />
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item label="Atividade" name="activity">
        <Select
          placeholder="Selecione a atividade"
          options={[
            { value: "Atividade 1", label: "Atividade 1" },
            { value: "Atividade 2", label: "Atividade 2" },
            { value: "Atividade 3", label: "Atividade 3" },
          ]}
        />
      </Form.Item>
    </Col>

    <Col xs={24} md={12}>
      <Form.Item label="O trabalhador usa EPI?" name="usesEpi">
        <Radio.Group>
          <Radio value="Sim">Sim</Radio>
          <Radio value="Não">Não</Radio>
        </Radio.Group>
      </Form.Item>
    </Col>
  </Row>

  <Button
    className="employee-modal-actions"
    type="primary"
    htmlType="submit"
    block
  >
    Salvar
  </Button>
</Form>
    </Modal>
  );
}

export default EmployeeModal;