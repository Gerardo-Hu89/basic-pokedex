import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AppContextProps {
  isOnTop: boolean;
  showButton: boolean;
  setIsOnTop: Dispatch<SetStateAction<boolean>>;
  setShowButton: Dispatch<SetStateAction<boolean>>;
}

interface ProviderProps {
  children: JSX.Element;
}

const AppContext = createContext<AppContextProps | null>(null);

const AppProvider = ({ children }: ProviderProps): JSX.Element => {
  const [isOnTop, setIsOnTop] = useState(false);
  const [showButton, setShowButton] = useState(false);

  window.onscroll = () => {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      setIsOnTop(false);
    } else {
      setIsOnTop(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isOnTop,
        setIsOnTop,
        showButton,
        setShowButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
