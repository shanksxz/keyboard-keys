import { useEffect, useRef, useState } from "react";

const App = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(['0_0'])

  const keyboardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const formattedCode = (() => {
        if (e.code.startsWith('Key')) return e.code.slice(3);
        if (e.code.startsWith('Digit')) return e.code.slice(5);
        if (e.code.startsWith('Numpad')) return e.code.slice(6);
        return e.code;
      })();

      setActiveKeys([formattedCode]); 
    };
    
    // const handleKeyUp = (e: KeyboardEvent) => {
    //   e.preventDefault();
    //   setActiveKeys((prev) => prev.filter((key) => key !== e.code));

    // };
    
    const keyboard = keyboardRef.current;
    console.log("Keyboard",keyboard);
    if (keyboard) {
      keyboard.addEventListener('keydown', handleKeyDown);
      // keyboard.addEventListener('keyup', handleKeyUp);
    }
    
    
    return () => {
      if (keyboard) {
        keyboard.removeEventListener('keydown', handleKeyDown);
        // keyboard.removeEventListener('keyup', handleKeyUp);
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