import styled from "styled-components";
import { TextMain } from "../ui/styledComps";
import { colors } from "../colors";

const TextBadge = ({
  badgeText,
  color,
}: {
  badgeText: string;
  color: string;
}) => {
  return (
    <Box style={{ backgroundColor: color }}>
      <BadgeText>{badgeText}</BadgeText>
    </Box>
  );
};

export default TextBadge;

const Box = styled.div`
  height: 32px;
  width: 80%;
  padding: 0 2px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const BadgeText = styled(TextMain)`
  color: ${colors.white};
  font-size: 12px;
`;
