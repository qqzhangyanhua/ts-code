const getPrice = (from, rate) => {
    if (from === 'wb') {
        if(rate>200){
            return rate-50
        }
        return rate * 0.8
    } else if (from === 'qq') {
        return rate * 0.9
    } else if (from === 'wx') {
        return rate * 0.7
    } else if(from==='dy'){
        return rate*0.6
    }else {
        return rate
    }
}
const froms ={
    wb(rate){

        return rate*0.8
    },
    qq(){},
    wx(){},
    dy(){},
    default(){

    }
}

const getPrice2 = (from, rate) => {

    return froms[from](rate)
}

