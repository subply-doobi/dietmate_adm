import styled from "styled-components";
import { colors } from "../colors";

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HorizontalSpace = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
`;

export const Icon = styled.img<{ size?: number }>`
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;
`;

export const TextMain = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.dark};
`;
