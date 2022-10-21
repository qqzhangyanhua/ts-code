

const test = ()=>{
    setTimeout(()=>{
        console.log('延迟2秒')
    },2000)
}
const test2 = ()=>{
    setTimeout(()=>{
        console.log('延迟1秒')
    },1000)
}

const fn =async()=>{
    console.log('开始')
    await test()
    await test2()


}

fn()