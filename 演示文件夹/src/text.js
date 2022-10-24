const context = []

const createSignal = (value) => {
    console.log('value: ' + value)
    const subscriptions = new Set();
    const readSignal = () => {
        const running = context.pop();
        if (running) {
            subscriptions.add({
                execute: running.execute
            })
            running.deps.add(subscriptions)
        }
        console.log('value: ' + value)
        return value;
    }
    const setter = (newValue) => {
        value = newValue;
        for (const sub of [...subscriptions]) {
            sub.execute();
        }
    }
    return [readSignal, setter()]
}


// const createSignal = (value) => {
//     const subscriptions = new Set();
//     const readFn = () => {
//       const running = context.pop();
//       if (running) {
//         subscriptions.add({
//           execute: running.execute
//         });
//         running.deps.add(subscriptions);
//       }
//       return value;
//     };
//     const writeFn = (newValue) => {
//       value = newValue;
//       for (const sub of [...subscriptions]) {
//         sub.execute();
//       }
//     };
//     return [readFn, writeFn];
//   };
  
const [age, setAge] = createSignal(12);
console.log('wwwww', age())