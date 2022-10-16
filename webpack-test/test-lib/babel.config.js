module.exports = function(api){
    api.cache(true);
    const presets =[
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                },
                "corejs": 3, //新版本需要指定核⼼库版本
                "useBuiltIns": "usage" //按需注⼊
            }
        ]
    ]
    return {
        presets
    }
}

