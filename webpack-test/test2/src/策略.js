const getPrice = (from, rate) => {
    if (from === 'wb') {
        return rate * 0.8
    } else if (from === 'qq') {
        return rate * 0.9
    } else if (from === 'wx') {
        return rate * 0.7
    } else {
        return rate
    }
}


const forms = {
    wb(rate) {
        return rate * 0.8
    },
    qq(rate) {
        return rate * 0.9
    },
    wx(rate) {
        return rate * 0.7
    }
}
const getPrices = (from, rate) => {
    return forms[from](rate)
}