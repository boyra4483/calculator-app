import classes from "./Keypad.module.css";
import Button from "../button/Button";
import { operators } from "../../common/common";

export default function Keypad({ onClick, expression }) {
  function handleClick(e) {
    const key = e.target.textContent;
    const splitedExpression = getSplitExpression(
      key == "=" ? expression : expression + key
    );

    if (!isValidData(expression, key, e.target)) return;
    if (key == "AC") return onClick("");

    if (splitedExpression && key == "=") {
      return onClick(`${calculating(splitedExpression)}`);
    }
    if (key == "+/-" && expression)
      return onClick(
        `${expression.startsWith("-") ? expression.slice(1) : `-${expression}`}`
      );

    onClick(key == "+/-" ? expression : expression + key);
  }

  return (
    <section className={classes["keypad"]} onClick={handleClick}>
      {getKeyButtons()}
    </section>
  );
}

function calculating([x, operator, y]) {
  const hasRemainder = [...(x + y)].includes(".");

  switch (operator) {
    case "+":
      return hasRemainder ? (+x + +y).toFixed(2) : +x + +y;
    case "-":
      return hasRemainder ? (x - y).toFixed(2) : x - y;
    case "X":
      return hasRemainder ? (x * y).toFixed(2) : x * y;
    case "/":
      return x % y != 0 ? (x / y).toFixed(2) : x / y;
    case "%":
      return (x / y) * 100 * 100;
  }
}

function getSplitExpression(expression) {
  if (expression == "") return;

  const copyExpression = expression.slice(1);
  const glew = operators.find((operator) => copyExpression.includes(operator));

  if (!glew || !copyExpression.split(glew)[1]) return;
  return [expression.split(glew)[0], glew, expression.split(glew)[1]];
}

function isOperatorDuplicated(expression) {
  const copyExpression = [
    ...(expression.startsWith("-") ? expression.slice(1) : expression),
  ];

  const operator = operators.find((operator) =>
    copyExpression.includes(operator)
  );

  return (
    copyExpression.includes(
      copyExpression.splice(
        copyExpression.findIndex((char) => char == operator),
        1
      )[0]
    ) || operators.find((operator) => copyExpression.includes(operator))
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

function isValidData(expression, key, target) {
  const splitedExpression = getSplitExpression(
    key == "=" ? expression : expression + key
  );

  if (target.tagName != "DIV") return false;
  if (!expression && operators.includes(key)) return false;
  if (operators.includes(key) && isOperatorDuplicated(expression + key))
    return false;
  if ((expression + key).endsWith("=") && !splitedExpression) return false;
  if (key == "." && !splitedExpression && expression.includes(key))
    return false;

  if (key == "." && splitedExpression) {
    const exp = splitedExpression[2].split("");
    exp.splice(
      splitedExpression.slice().findIndex((char) => char == "."),
      1
    );
    return exp.includes(".") ? false : true;
  }
  if (!splitedExpression && key == "%") return false;
  return true;
}
