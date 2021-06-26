import { useState } from "react";

// カスタムhook（stateとstateを変えるためのメソッドが必要）
export const useCounter = (initialCount:number) => {
  // propsを受け取り、その値を初期値として利用する

  // stateを変えるためのメソッド
  const [count, setCount] = useState(initialCount);

  // メソッド
  const increment = () => {
    setCount((prev: number) => prev + 1);
  };
  const decrement = () => {
    setCount((prev: number) => prev - 1);
  };
  const double = () => {
    setCount((prev: number) => prev * 2);
  };
  const triple = () => {
    setCount((prev: number) => prev * 3);
  };
  const reset = () => {
    setCount(0);
  };

  // stateをメソッドをreturn
  return { count, increment, decrement, double, triple, reset };

  // 呼び出し方
  // {}にすると、呼び出すときに
  // const customHooks = useCounter()
//   ▼こんな感じのオブジェクトで呼び出せる
  // count: 3
//   decrement: () => {
//     setCount((prev) => prev - 1);
//   };
//   double: () => {
//     setCount((prev) => prev * 2);
//   };
//   increment: () => {
//     setCount((prev) => prev + 1);
//   };
//   reset: () => {
//     setCount(0);
//   };
//   triple: () => {
//     setCount((prev) => prev * 3);
//   };
//   __proto__: Object;


  // 配列にすると[0]とかで呼び出さないといけないから直感的でない
  // return [ count, increment, decrement, double, triple, reset ];
}