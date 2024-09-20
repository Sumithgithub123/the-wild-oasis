import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-weight: 500;
`;

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function FormRowVertical({ label, children }) {
  return (
    <StyledFormRowVertical>
      <Label>{label}</Label>
      {children}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
