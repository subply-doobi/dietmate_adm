import styled from "styled-components";
import { colors } from "../../shared/colors";
import { useEffect, useState } from "react";
import { icons } from "../../shared/iconSource";
import { useLocation, useNavigate } from "react-router-dom";
import { HorizontalSpace, Icon } from "../../shared/ui/styledComps";

const PAGES = [
  {
    title: "주문관리",
    screen: "order",
    activeIcon: icons.list_filled_white_24,
    inactiveIcon: icons.list_line_24,
  },
  {
    title: "상품관리",
    screen: "product",
    activeIcon: icons.food_filled_white_24,
    inactiveIcon: icons.food_line_24,
  },
];

const Drawer = () => {
  // navigation
  const location = useLocation();
  const navigate = useNavigate();

  // useState
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  // etc
  const currentPage = location.pathname.split("/")[1];
  const drawerWidth = isDrawerOpen ? "15%" : "72px";
  const logoSource = require("../../shared/img/logo.png");

  useEffect(() => {
    const updateWidth = () => {
      const windowWidth = window.innerWidth;
      const twentyPercent = windowWidth * 0.2;
      setIsDrawerOpen(twentyPercent < 240 ? false : true);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Container style={{ width: drawerWidth }}>
      <LogoBox
        style={{
          justifyContent: isDrawerOpen ? "flex-start" : "center",
          paddingLeft: isDrawerOpen ? 24 : 0,
        }}
      >
        <Logo src={logoSource} alt="logo" />
        {isDrawerOpen && <LogoText>DM관리자</LogoText>}
      </LogoBox>
      <HorizontalSpace height={72} />
      {PAGES.map((page, index) => {
        const isActive = page.screen === currentPage;
        return (
          <Btn
            key={index}
            isActive={isActive}
            style={{ justifyContent: isDrawerOpen ? "flex-start" : "center" }}
            onClick={() => navigate(page.screen)}
          >
            {!isDrawerOpen && (
              <Icon
                src={isActive ? page.activeIcon : page.inactiveIcon}
                size={24}
              />
            )}
            {isDrawerOpen && (
              <BtnText isActive={page.screen === currentPage}>
                {page.title}
              </BtnText>
            )}
          </Btn>
        );
      })}
    </Container>
  );
};

export default Drawer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.15);
  z-index: 1;
`;

const LogoBox = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  align-items: flex-end;
  margin-top: 24px;
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
`;

const LogoText = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  margin-left: 8px;
  margin-bottom: 4px;
`;

const Btn = styled.button<{ isActive: boolean }>`
  display: flex;
  height: 56px;
  width: 100%;
  background-color: ${({ isActive }) =>
    isActive ? colors.dark : colors.backgroundLight};
  align-items: center;
  border-width: 0;
`;

const BtnText = styled.span<{ isActive: boolean }>`
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  margin-left: 40px;
  color: ${({ isActive }) => (isActive ? colors.white : colors.dark)};
`;
