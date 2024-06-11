import styled from "styled-components";
import { TextMain } from "../../shared/ui/styledComps";

interface ICell extends React.HTMLAttributes<HTMLDivElement> {
  manualFlex?: number;
}

export default function Cell({ children }: ICell) {
  return (
    <Box>
      <TextMain style={{ fontSize: 14 }}>{children}</TextMain>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
`;
