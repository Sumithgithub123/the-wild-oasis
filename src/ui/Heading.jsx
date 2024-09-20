import styled, { css } from "styled-components";

const test = css`
  text-align: center;
`;

const H1 = styled.h1`
  ${(props) =>
    props.as == "h1" &&
    css`
      font-size: 30px;
      font-weight: 600;
    `}

  ${(props) =>
    props.as == "h3" &&
    css`
      font-size: 30px;
      font-weight: 600;
    `}

    ${(props) =>
    props.as == "h4" &&
    css`
      font-size: 25px;
      font-weight: 600;
      text-align: center;
    `}
`;

export default H1;
