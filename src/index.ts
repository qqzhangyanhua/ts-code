// import './ts-code/2'
// import './ts-code/13'
function add(name: string, value: string): string;
function add(name: number, value: number): string;
function add(name: any, value: any) {
  return name + value;
}
add("string1", "string2"); //ok
add(1, 2); //ok
add(1, "string");  //报错
