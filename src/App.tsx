import { useEffect, useRef, useState } from "react";

type KeyboardProps =  {
  onKeyPress?: (key: string) => void;
  onKeyRelease?: (key: string) => void;
}

const keys: string[][] = [
  ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Prt Sc', 'Scr Lk', 'Pause'],
  ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace', 'Insert', 'Home', 'Pg Up', 'Num Lk', '/', '*', '-'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Delete', 'End', 'Pg Dn', '7', '8', '9', '+'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "'", 'Enter', '4', '5', '6', ','],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', '↑', '1', '2', '3', 'Enter'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Ctrl', '←', '↓', '→', '0', '.']
];

const App: React.FC<KeyboardProps> = ({ onKeyPress, onKeyRelease }) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(['0_0']);
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.code;
      setActiveKeys(() => [key]);
      console.log(`Key Down: ${key}`);
      if (onKeyPress) {
        onKeyPress(key);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.code;
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
      console.log(`Key Up: ${key}`);
      if (onKeyRelease) {
        onKeyRelease(key);
      }
    };
    

    const keyboard = keyboardRef.current;
    if (keyboard) {
      keyboard.addEventListener('keydown', handleKeyDown);
      keyboard.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      if (keyboard) {
        keyboard.removeEventListener('keydown', handleKeyDown);
        keyboard.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, []);

  return (
    <div
      ref={keyboardRef}
      className="h-screen flex flex-col justify-center items-center"
      tabIndex={0}
    >
      <h1 className="mb-2">
        You Pressed 
        <span className='bg-gray-300 px-2 py-1 rounded-sm mx-2'>
          {activeKeys} 
        </span>
        Last
      </h1>
      {keys.map((row, i) => (
        <div key={i} className="flex">
          {row.map((key, j) => (
            <div
              key={j}
              className={`h-10 border border-black text-center ${
                key.length > 2 ? 'w-28' : 'w-14'
              } hover:cursor-pointer ${
                activeKeys.includes(key) ? 'bg-gray-300' : ''
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;