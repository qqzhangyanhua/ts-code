import styles from "./App.module.css";
import Component1 from "./component/item";
import { createSignal, createEffect, batch, Switch, Match,onMount,lazy } from "solid-js";
import {Dynamic , Portal } from 'solid-js/web';
import { SiJavascript } from "solid-icons/si";
import { CgAddR } from 'solid-icons/cg'

//函数式组件
function ListItem(props) {
  return (
    <ul>
      {props.children.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
function Counter() {
  const [count, etCount] = createSignal("hello");
  createEffect(() => console.log("counter", count()));
  return <button onClick={() => etCount(count() + 1)}>{count()}</button>;
}
function AboutBatch() {
  const [firstName, setFirstName] = createSignal("Json");
  const [lastName, setLastName] = createSignal("Anno");
  const fullName = () => {
    return `${firstName()}==== ${lastName()}`;
  };
  const updateName = () => {
    console.log("update===");
    batch(() => {
      setLastName(lastName() + "!!!");
      setFirstName(firstName() + "???");
    });
  };
  return <button onClick={updateName}>{fullName()}</button>;
}
function AboutFor() {
  return (
    <div>
      <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} fallback={<div>failed</div>}>
        {(item) => <span>{item}</span>}
      </For>
    </div>
  );
}
function AboutShow() {
  let myRef
  const [count, setCount] = createSignal(10);
  const handelSetCount = () => {
    debugger
    setCount(count() - 6);
    console.log("myRef===",myRef);
  };

  return (
    <div>
      <button onClick={handelSetCount}>按钮1111</button>
      <Show when={count() > 5}>
        <span ref={myRef}>{count()}</span>
      </Show>
    </div>
  );
}
function AboutSwitch(){
  const [x] = createSignal(6);
  return (
    <Switch fallback={<div>{x} is 小于10</div>}>
      <Match when={x() > 10}>
        <p> {x()}是大于10</p>
      </Match>
      <Match when={x() > 5}>
        <p> {x()}是大于5</p>
      </Match>
    </Switch>
  );
};
const RedThing = () => <strong style="color: red">Red Thing</strong>
const GreenThing = () => <strong style="color: green">Green Thing</strong>
const BlueThing = () => <strong style="color: blue">Blue Thing</strong>

const options = {
  red: RedThing,
  green: GreenThing,
  blue: BlueThing
}

function AboutDynamic() {
  const [selected, setSelected] = createSignal("red");

  return (
    <>
      <select value={selected()} onInput={e => setSelected(e.currentTarget.value)}>
        <For each={Object.keys(options)}>{
          color => <option value={color}>{color}</option>
        }</For>
      </select>
      {/* //动态组件 */}
      <Dynamic component={options[selected()]} />
    </>
  )
}
function AboutPortal() {
  onMount(()=>{
    console.log("生命周期其他组件")
  })
  return (
    <div class="app-container">
      <SiJavascript size={24} color="#2c4f7c" />
      <CgAddR />
      <p>Just some text inside a div that has a restricted size.</p>
      {/* 之歌值被挂在body下面了，类似于vue3的某个api */}
      <Portal>
        <div class="popup">
            <h1>Popup</h1>
            <p>Some text you might need for something or other.</p>
        </div>
       </Portal>
    </div>
  );
}



function App() {
  onMount(()=>{
    console.log("生命周期app")
  })
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <AboutPortal/>
        <AboutDynamic/>
        <AboutSwitch/>
        <AboutShow />
        <AboutFor />
        <AboutBatch />
        <Counter />
        <ListItem children={[1, 2, 3, 4]}></ListItem>
        <Component1 title={"component1"} content={"content"}>
          <h2>标签中心内容</h2>
        </Component1>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
