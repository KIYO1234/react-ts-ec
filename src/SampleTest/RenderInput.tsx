import React, { useState } from "react";

type MyFunctionType = (event: any | undefined) => void
// propsに関数を渡す場合の型定義
interface Props {
    outputConsole: (event: string) => void
}
const RenderInput: React.FC<Props> = ({ outputConsole }) => {

  const [input, setInput] = useState("");
  const updateValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    // console.log(e.target.value)
  }
  const outputValue = () => {
      if(input){
          outputConsole(input)
      }
  }

  return (
    <div>
        <input 
            type="text" 
            placeholder='Enter' 
            value={input} 
            onChange={updateValue} 
        />
        <button onClick={outputValue}>Console</button>
    </div>
  );
};

export default RenderInput;
