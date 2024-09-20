import styled from "styled-components";
import { useDarkMode } from "../context/DarkmodeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isdarkmode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        src={`${isdarkmode ? "logo-dark.png" : "logo-light.png"}`}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
