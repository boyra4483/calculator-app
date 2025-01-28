import classes from "./Display.module.css";

export default function Display({ expression }) {
  return <div className={classes["display"]}>{expression}</div>;
}
