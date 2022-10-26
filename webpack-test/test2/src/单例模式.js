 //简单的单例模式

 class Storage {
     static localStorage = {}
     static getInstance() {
         if (!Storage.instance) {
             Storage.instance = new Storage();
         }
         return Storage.instance;
     }
     getItem(key) {
         return Storage.localStorage[key];
     }
     setItem(key, value) {
         Storage.localStorage[key] = value;
     }
 }

 const storage1 = Storage.getInstance();
 const storage2 = Storage.getInstance();
 storage1.setItem('name', 'zhangsan');
 console.log(storage2.getItem('name'));
 storage1.getItem('name') === storage2.getItem('name') // true