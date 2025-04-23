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
      <p className={classes["gratitude"]}>
        thank{" "}
        <a
          href="https://www.figma.com/community/file/1284214703277704177"
          target="_blank"
        >
          Kritika Adhikari
        </a>{" "}
        very much for free template
      </p>
    </section>
  );
}
