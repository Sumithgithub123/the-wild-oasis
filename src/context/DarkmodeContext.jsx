/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const Darkmode = createContext();

function DarkmodeContext({ children }) {
  //   const [darkmode, setdarkmode] = useState(false);
  const [isdarkmode, setisdarkmode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isdarkmode"
  );

  function changetheme() {
    setisdarkmode((dark) => !dark);
  }

  useEffect(() => {
    if (isdarkmode) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isdarkmode]);

  return (
    <Darkmode.Provider value={{ isdarkmode, changetheme }}>
      {children}
    </Darkmode.Provider>
  );
}

function useDarkMode() {
  const context = useContext(Darkmode);
  if (context === undefined) {
    throw new Error("Darkmode context is used outside its provider!");
  }
  return context;
}

export { DarkmodeContext, useDarkMode };
