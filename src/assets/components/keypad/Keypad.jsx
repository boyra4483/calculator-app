import classes from "./Keypad.module.css";
import Button from "../button/Button";
import { operators } from "../../common/common";

export default function Keypad({ onClick, expression }) {
  function handleClick(e) {
    const target = e.target;
    const key = e.target.textContent;
    const splitedExpression = getSplitExpression(
      key == "=" ? expression : expression + key
    );

    if (!expression && operators.includes(key)) return;
    if (key == "AC") return onClick("");
    if (target.tagName != "DIV") return;
    if (splitedExpression && key == "=") {
      console.log(splitedExpression);
      console.log(calculating(splitedExpression));
      return onClick(calculating(splitedExpression));
    }

    onClick(expression + key);
  }

  return (
    <section className={classes["keypad"]} onClick={handleClick}>
      <Button value="AC" />
      <Button value="+/-" />
      <Button value="%" />
      <Button value="/" />
      <Button value="7" />
      <Button value="8" />
      <Button value="9" />
      <Button value="X" />
      <Button value="4" />
      <Button value="5" />
      <Button value="6" />
      <Button value="-" />
      <Button value="1" />
      <Button value="2" />
      <Button value="3" />
      <Button value="+" />
      <Button value="0" />
      <Button value="." />
      <Button value="=" />
    </section>
  );
}

function calculating([x, operator, y]) {
  switch (operator) {
    case "+":
      return (+x + +y).toFixed(0);
    case "-":
      return (x - y).toFixed(0);
    case "X":
      return (x * y).toFixed(0);
    case "/":
      return (x / y).toFixed(2);
    case "%":
      return (x / y) * 100 * 100;
  }
}

function getSplitExpression(expression) {
  if (expression == "") return;
  const glew = operators.find((operator) => expression.includes(operator));

  if (!glew || !expression.split(glew)[1]) return;
  return [expression.split(glew)[0], glew, expression.split(glew)[1]];
}
