import "./Stepper.css";
import { NavLink } from "react-router-dom";

const steps = [
  {
    title: "Item 1",
    path: "/",
  },

  {
    title: "Item 2",
    path: "/employees",
  },

  {
    title: "Item 3",
    path: "/activities",
  },

  {
    title: "Item 4",
    path: "/relatorios",
  },

  {
    title: "Item 5",
    path: "/configuracoes",
  },

  {
    title: "Item 6",
    path: "/etapa-1",
  },
];

function Stepper() {
  return (
    <div className="stepper-wrapper">
      <div className="stepper-container">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <NavLink
              to={step.path}
              className={({ isActive }) =>
                `step-circle ${isActive ? "active" : ""}`
              }
            >
              🏢
            </NavLink>

            <span>{step.title}</span>

            {index < steps.length - 1 && (
              <div className="step-line"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stepper;