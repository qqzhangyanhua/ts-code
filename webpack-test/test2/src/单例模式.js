 //简单的单例模式

class Storage{
    static localStorage = {}
    static getInstance(){
        if(!Storage.instance){
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }
    setItem(key,value){
        localStorage[key] = value;
    }
    getItem(key){
        return localStorage[key];
    }
}
const storage1 = Storage.getInstance();
const storage2 = Storage.getInstance();
console.log(storage1 === storage2); //true