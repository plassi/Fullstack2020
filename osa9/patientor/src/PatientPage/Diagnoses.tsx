import React from "react";
import { useStateValue } from "../state";

const Diagnoses: React.FC<{ diagnoses: string[] }> = ({ diagnoses }) => {
  const [{ diagnoses: diagnosis }] = useStateValue();

  if (!diagnoses) {
    return null;
  }

  return (
    <ul>
      {diagnoses.map(diagnose => {
        return (
          <li key={diagnose}>{diagnose} {Object.values(diagnosis)
            .find(d => d.code === diagnose)?.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Diagnoses;