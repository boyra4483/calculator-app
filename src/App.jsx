import classes from "./App.module.css";
import Display from "./assets/components/display/display";
import Keypad from "./assets/components/keypad/Keypad";

export default function App() {
  return (
    <section className={classes["calculator"]}>
      <Display />
      <Keypad />
    </section>
  );
}
