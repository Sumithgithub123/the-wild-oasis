import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkmodeContext";

function DarkModeToggle({ onClick }) {
  const { isdarkmode, changetheme } = useDarkMode();

  return (
    <ButtonIcon onClick={changetheme}>
      {isdarkmode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
