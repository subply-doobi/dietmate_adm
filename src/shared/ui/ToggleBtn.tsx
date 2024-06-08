import styled from "styled-components";
import { TextMain } from "../ui/styledComps";
import { colors } from "../colors";

interface IToggleBtn extends React.HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  btnText: string;
}
const ToggleBtn = ({ isActive, btnText, ...props }: IToggleBtn) => {
  return (
    <Btn isActive={isActive} {...props}>
      <BtnText isActive={isActive}>{btnText}</BtnText>
    </Btn>
  );
};

export default ToggleBtn;

const Btn = styled.button<{ isActive: boolean }>`
  height: 32px;
  border-radius: 5px;
  border-color: ${colors.inactive};
  border-width: ${({ isActive }) => (isActive ? "0px" : "1px")};
  background-color: ${({ isActive }) =>
    isActive ? colors.dark : colors.white};
  border-style: solid;
  padding: 0px 8px;

  align-items: center;
  justify-content: center;
`;

const BtnText = styled(TextMain)<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? colors.white : colors.textMain)};
`;
