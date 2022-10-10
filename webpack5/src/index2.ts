class Person{
    constructor(public name:string){
        this.name = name;
    }
    print(){
        console.log(this.name);
    }
}

const lisi = new Person('lisi');
console.log(lisi);