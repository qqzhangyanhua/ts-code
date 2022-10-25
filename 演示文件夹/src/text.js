const context = []

// const createSignal = (value) => {
//     console.log('value: ' + value)
//     const subscriptions = new Set();
//     const readSignal = () => {
//         console.log('value====: ' + value)

//         const running = context.pop();
//         if (running) {
//             subscriptions.add({
//                 execute: running.execute
//             })
//             running.deps.add(subscriptions)
//         }
//         return value;
//     }
//     const setter = (newValue) => {
//         value = newValue;
//         for (const sub of [...subscriptions]) {
//             sub.execute();
//         }
//     }
//     return [readSignal, setter()]
// }


function createSignal (value){
    const subscriptions = new Set();
    console.log('wwwww', value)
    const s ={
        value,
        observer:null
    }
    // const readFn = () => {
    //     console.log('wwwww===', value)
    //     const running = context.pop();
    //     if (running) {
    //         subscriptions.add({
    //             execute: running.execute
    //         });
    //         running.deps.add(subscriptions);
    //     }
    //     return value;
    // };
    const writeFn = (newValue) => {
        value = newValue;
        for (const sub of [...subscriptions]) {
            sub.execute();
        }
    };
    return [readSignal.bind(s), writeFn];
};
function readSignal(self){
    console.log('self==',self)
    // return  self.value
    return self
}
const [age, setAge] = createSignal(12);
console.log('wwwww', age())