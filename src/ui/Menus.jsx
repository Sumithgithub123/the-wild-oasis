/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutSideClick from "../hooks/useOutSideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const Menucontext = createContext();

function Menus({ children }) {
  const [toggleid, settoggleid] = useState("");
  const [position, setposition] = useState();

  const close = () => settoggleid("");
  const open = (id) => {
    settoggleid(id);
  };

  return (
    <Menucontext.Provider
      value={{ toggleid, open, close, position, setposition }}
    >
      {children}
    </Menucontext.Provider>
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(Menucontext);
  function handleclick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleclick}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

function Toggle({ id }) {
  const { toggleid, open, close, setposition } = useContext(Menucontext);

  function handleclick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setposition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    toggleid === "" || toggleid !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleclick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { toggleid, close, position } = useContext(Menucontext);

  // const refe = useOutSideClick(close);
  const refe = useOutSideClick(close, false);

  if (id !== toggleid) return null;

  return createPortal(
    <StyledList ref={refe} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
