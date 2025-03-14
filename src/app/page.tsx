import Button from "./components/Button"
import Image from 'next/image'
// import styles from './main.module.scss'
// import styles from "../styles/main.scss";
// import { classLister } from "../lib/utils";
// const classes = classLister(styles);

export default function Home() {
  return (
    <div>
      <Image
        src="/bolt.gif"
        width={800}
        height={400}
        className="flex hidden md:block"
        alt="Sluts" />
      <Image
        src="/sluts.JPG"
        width={800}
        height={400}
        className="flex hidden md:block"
        alt="Sluts" />
    </div>
  );
}
