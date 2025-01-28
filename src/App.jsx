import classes from "./App.module.css";
import Display from "./assets/components/display/display";
import Keypad from "./assets/components/keypad/Keypad";
import { useState } from "react";

export default function App() {
  const [expression, setExpression] = useState("");
  const operands = getOperands(expression);
  console.log(operands);
  return (
    <section className={classes["calculator"]}>
      <Display expression={expression} />
      <Keypad expression={expression} onClick={setExpression} />
    </section>
  );
}

function getOperands(expression) {
  if (isNaN(expression)) return [parseFloat(expression)];
  const glew = ["+", "-", "%", "X", "/"].find((operator) =>
    expression.includes(operator)
  );

  return expression.split(glew).length == 1
    ? null
    : [expression.split(glew)[0], expression.split(glew)[1]];
}
