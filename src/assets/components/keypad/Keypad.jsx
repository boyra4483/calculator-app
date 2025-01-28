import classes from "./Keypad.module.css";
import Button from "../button/Button";

export default function Keypad() {
  function handleClick(e) {
    if (e.target.tagName == "SECTION") return;
    console.log(e.target.tagName);
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
