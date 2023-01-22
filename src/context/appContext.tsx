import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AppContextProps {
  type: string;
  isOnTop: boolean;
  isVisible: boolean;
  showButton: boolean;
  setType: Dispatch<SetStateAction<string>>;
  setIsOnTop: Dispatch<SetStateAction<boolean>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setShowButton: Dispatch<SetStateAction<boolean>>;
}

interface ProviderProps {
  children: JSX.Element;
}

const AppContext = createContext<AppContextProps>({
  isOnTop: false,
  type: 'nothing',
  isVisible: false,
  showButton: false,
  setType: () => {},
  setIsOnTop: () => {},
  setIsVisible: () => {},
  setShowButton: () => {},
});

const AppProvider = ({ children }: ProviderProps): JSX.Element => {
  const [type, setType] = useState('nothing');
  const [isOnTop, setIsOnTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
        type,
        setType,
        isOnTop,
        isVisible,
        setIsOnTop,
        showButton,
        setIsVisible,
        setShowButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
