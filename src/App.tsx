import { useEffect, useRef, useState } from "react";

type KeyboardProps =  {
  onKeyPress?: (key: string) => void;
  onKeyRelease?: (key: string) => void;
}

const App: React.FC<KeyboardProps> = ({ onKeyPress, onKeyRelease }) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(['0_0'])
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
      setActiveKeys((prev) => prev.filter((k) => k !== key));
      console.log(`Key Up: ${key}`);
      if (onKeyRelease) {
        onKeyRelease(key);
      }
    };
    

    const keyboard = keyboardRef.current;
    console.log("Keyboard",keyboard);
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
    className="h-screen bg-black text-white flex flex-col justify-center items-center"
    tabIndex={0}
   >
    <h1 className="mb-2">
     You Pressed
     <span className='bg-gray-700 text-white px-2 py-1 rounded-md mx-2'>
      {Array.from(activeKeys)}
     </span>
      Last
    </h1>
   </div>
 
  );
};

export default App;