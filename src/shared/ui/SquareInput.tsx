import styled from "styled-components";
import { colors } from "../styles/colors";
import { InputHTMLAttributes } from "react";

const SquareInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <Input {...props} />;
};

export default SquareInput;

const Input = styled.input`
  height: 32px;
  border-color: ${colors.line};
  border-width: 1px;
  border-style: solid;
  color: ${colors.textMain};
  background-color: ${colors.white};
  border-radius: 5px;
  font-size: 16px;
  line-height: 20px;
  padding: 0 8px;
`;
