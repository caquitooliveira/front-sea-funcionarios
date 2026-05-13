import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployees } from "../services/employeeService";

export type Employee = {
  id?: number;
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
};

type EmployeeState = {
  employees: Employee[];
  loading: boolean;
};

const initialState: EmployeeState = {
  employees: [],
  loading: false,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const data = await getEmployees();

    return data.map((employee: Employee) => ({
      ...employee,
      key: String(employee.id),
    }));
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default employeeSlice.reducer;