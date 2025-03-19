import styled from "styled-components";
import { colors } from "../styles/colors";
import { Icon } from "./styledComps";
import { icons } from "../iconSource";
import { useAppDispatch, useAppSelector } from "../../app/reduxStore/hooks";
import { closeRightModal } from "../../features/modal/modalSlice";
import OrderRMContent from "../../components/modalContent/OrderRMContent";
import ProductRMContent from "../../components/modalContent/ProductRMContent";
import { useEffect } from "react";

const modalOptionToComponent: {
  [key: string]: React.ReactNode;
} = {
  Order: <OrderRMContent />,
  Product: <ProductRMContent />,
};

interface IRightModal extends React.HTMLAttributes<HTMLDivElement> {}

export default function RightModal({}: IRightModal) {
  // redux
  const dispatch = useAppDispatch();
  const { isRMVisible, modalOption, dataId } = useAppSelector(
    (state) => state.rightModal
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeRightModal());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  if (!isRMVisible) {
    return null;
  }
  return (
    <Container>
      <Modal>{modalOptionToComponent[modalOption] || null}</Modal>
      <CancelBtn onClick={() => dispatch(closeRightModal())}>
        <Icon size={32} src={icons.cancel_48} />
      </CancelBtn>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${colors.backgroundModal};
  z-index: 1;
`;

const Modal = styled.div`
  position: absolute;
  width: 70%;
  height: 100%;
  background-color: ${colors.backgroundLight};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  right: 0;
  overflow-y: auto;
`;

const CancelBtn = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  border-width: 0;
  background-color: ${colors.backgroundLight};
`;
