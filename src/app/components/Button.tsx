import styles from './Button.module.scss';
import { classLister } from "@/app/lib/utils";
const classes = classLister(styles);

const Button = () => (
    <button className={`${classes("button")} text-xl text-blue-800 md:text-3xl md:leading-normal`}>Click Me</button>
  );

export default Button