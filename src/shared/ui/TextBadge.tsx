import styled from "styled-components";
import { TextMain } from "../ui/styledComps";
import { colors } from "../styles/colors";

interface ITextBadge extends React.HTMLAttributes<HTMLDivElement> {
  badgeText: string;
  color: string;
}
const TextBadge = ({ badgeText, color, style, ...otherProps }: ITextBadge) => {
  return (
    <Box style={{ backgroundColor: color, ...style }} {...otherProps}>
      <BadgeText>{badgeText}</BadgeText>
    </Box>
  );
};

export default TextBadge;

const Box = styled.div`
  display: flex;
  height: 32px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const BadgeText = styled(TextMain)`
  color: ${colors.white};
  font-size: 12px;
`;
