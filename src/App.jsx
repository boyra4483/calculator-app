import classes from "./App.module.css";
import Display from "./assets/components/display/display";
import Keypad from "./assets/components/keypad/Keypad";
import { useState } from "react";

export default function App() {
  const [expression, setExpression] = useState("");

  return (
    <section className={classes["calculator"]}>
      <Display expression={expression} />
      <Keypad expression={expression} onClick={setExpression} />
    </section>
  );
}
