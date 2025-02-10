import classes from "./Keypad.module.css";
import Button from "../button/Button";
import { operators } from "../../common/common";

export default function Keypad({ onClick, expression }) {
  function handleClick(e) {
    const key = e.target.textContent;
    const completeExpression = expression + key;

    if (!isValidData(completeExpression, e.target)) return;
    if (key == "+/-") {
      return onClick(
        `${
          completeExpression.startsWith("-")
            ? completeExpression.slice(1, -3)
            : `-${completeExpression.slice(0, -3)}`
        }`
      );
    }

    if (key == "AC") return onClick("");
    if (completeExpression.endsWith("=")) {
      return onClick(getResult(completeExpression));
    }

    onClick(completeExpression);
  }

  return (
    <section className={classes["keypad"]} onClick={handleClick}>
      {getKeyButtons()}
    </section>
  );
}

function getKeyButtons() {
  return (
    <>
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
    </>
  );
}

function getResult(expression) {
  const result = window.eval(expression.replaceAll("X", "*").slice(0, -1));
  return `${result}`.includes(".") ? result.toFixed(2) : result;
}

function isValidData(expression, target) {
  if (target.tagName != "DIV") return false;
  if (expression == "=") return false;
  if (operators.includes(expression)) return false;
  if (
    (expression.slice(-3) != "+/-" &&
      operators.includes(expression.split("").at(-1)) &&
      operators.includes(expression.split("").at(-2))) ||
    (expression.split("").at(-1) == "." && expression.split("").at(-2) == ".")
  )
    return false;
  return true;
}
