import styles from './App.module.css';
import Component1 from './component/item';
import { createSignal,createEffect,batch } from "solid-js";
//函数式组件
function ListItem(props){
  return (
    <ul>
      {props.children.map(item =><li>{item}</li>)}
    </ul>
  )
}
function Counter() {
  const [count, etCount] = createSignal('hello');
  createEffect(()=>console.log('counter',count()))
  return (
    <button onClick={()=> etCount(count() + 1)}>
      {count()}
    </button>
  )
}
function AboutBatch(){
  const [firstName, setFirstName] = createSignal('Json');
  const [lastName, setLastName] = createSignal('Anno');
  const fullName =()=>{
    return `${firstName()}==== ${lastName()}`
  }
  const updateName = ()=>{
    console.log('update===')
    batch(()=>{
      setLastName(lastName() + '!!!');
      setFirstName(firstName() + '???');
    })
   
  }
  return <button onClick={updateName}>{fullName()}</button>
}
function AboutFor(){
  return (
    <div>
      <For each={[1,2,3,4,5,6,7,8,9,10]} fallback={<div>failed</div>} >
      {(item)=><span>{item}</span>}
      </For>
    </div>
  )
}
function AboutShow(){
  const [count,setCount] = createSignal(10)
  const handelSetCount = ()=>{
    setCount(count()-6)
  }
  return (
    <div>
      <button onClick={handelSetCount}>按钮</button>
      <Show when={count()>5}>
        <span>{count()}</span>
      </Show>
    </div>
  )
}

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <AboutShow/>
        <AboutFor/>
        <AboutBatch/>
        <Counter/>
        <ListItem children={[1,2,3,4]}></ListItem>
      <Component1 title={'component1'} content={'content'}>
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
