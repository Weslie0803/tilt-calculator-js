'use client'
import Image from "next/image";
import {useState} from "react";
import styles from "./page.module.css";
import {InputNumber, Slider, Button} from "antd"
import {TiltData}  from "../utils/types";
import {calculate} from "../utils/calculate"

const rotate_style = (theta: number) : string => {
  return "rotate(" + (-theta) + "deg)"
}


const Home = () => {
  const [h1, set_h1] = useState(0);
  const [k1, set_k1] = useState(0);
  const [l1, set_l1] = useState(0);
  const [h2, set_h2] = useState(0);
  const [k2, set_k2] = useState(0);
  const [l2, set_l2] = useState(0);
  const [alpha1, set_alpha1] = useState(0);
  const [beta1, set_beta1] = useState(0);
  const [rotate_theta, set_rotate_theta] = useState(0);
  
  const testfunc = (event: any) => {
    console.log('h1: %d', h1);
    console.log('beta: %d', beta1);
  }

  const calculate_click = (event: any) => {
    const data: TiltData = {
      h1: h1,
      k1: k1,
      l1: l1,
      h2: h2,
      k2: k2,
      l2: l2,
      alpha1: alpha1,
      beta1: beta1,
      rotate_theta: rotate_theta
    };
    const [alpha2, beta2] = calculate(data);
    alert("α="+ alpha2.toFixed(2) + ", β="+ beta2.toFixed(2));
  }

  
  const seth1 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_h1((x) => value);
    else
      set_h1((x) => 0);
  }
  const setk1 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_k1((x) => value);
    else set_k1((x) => 0);
  }
  const setl1 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_l1((x) => value);
    else set_l1((x) => 0);
  }
  const seth2 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_h2((x) => value);
    else set_h2((x) => 0);
  }
  const setk2 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_k2((x) => value);
    else set_k2((x) => 0);
  }
  const setl2 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_l2((x) => value);
    else set_l2((x) => 0);
  }
  const setAlpha1 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_alpha1((x) => value);
    else set_alpha1((x) => 0);
  }
  const setBeta1 = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_beta1((x) => value);
    else set_beta1((x) => 0);
  }
  const setRotateTheta = (value: number | string | null) : void => {
    if (typeof value === "number")
      set_rotate_theta((x) => value);
    else set_rotate_theta((x) => 0);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Tilt Calculator
        </p>
        {/* <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>

      <div className={styles.hkl}>
        <div>
          Input index of the zone axis:
        </div>
        <div> 
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={seth1}/>
        </div>
        <div> 
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={setk1}/>
        </div>
        <div>
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={setl1}/>
        </div>
      </div>
      
      <div className={styles.hkl}>
        <div>
          Input current α and β angle:
        </div>
        <div> 
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={setAlpha1}/>
        </div>
        <div> 
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={setBeta1}/>
        </div>
      </div>
      
      <div>
        <div>
          Select direction of diffraction pattern:
        </div>
        <Image
          src="./100.svg"
          alt="DP"
          width={100}
          height={100}
          style={{transform: rotate_style(rotate_theta)}}
        />
        <div>
          <Slider defaultValue={0} min={-45} max={45} tooltip={{formatter: null}} onChange={setRotateTheta}/>
        </div>
      </div>
      
      <div className={styles.hkl}>
        <div>
          Input index of target zone axis:
        </div>
        <div> 
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={seth2}/>
        </div>
        <div> 
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={setk2}/>
        </div>
        <div>
          <InputNumber defaultValue={0} controls={false} style={{width: "30pt"}} onChange={setl2}/>
        </div>
      </div>

      <Button type="primary" onClick={calculate_click}>
        Calculate!
      </Button>

      {/* <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}

export default Home;