import classes from "./Button.module.css";

export default function Button({ value }) {
  return <div className={classes["button"]}>{value}</div>;
}
