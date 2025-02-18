import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Keyboard } from "react-native";

interface KeyboardContextType {
  isKeyboardVisible: boolean;
}

const initialValue: KeyboardContextType = {
  isKeyboardVisible: false,
};

export const KeyboardContext = createContext(initialValue);

export function KeyboardProvider({ children }: PropsWithChildren) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardContext.Provider
      value={{
        isKeyboardVisible,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
}
