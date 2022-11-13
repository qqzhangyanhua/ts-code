
const {createStore} = require('redux')
const initState = {
    name:'zhangsan',
    age:18
}

//定义redux
function reduxr(){
    return initState
}
const store = createStore(reduxr)
module.exports =store