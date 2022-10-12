export enum TokenTypes {
  Paren,
  Name,
  Number,
  Program
}

export interface Token {
  type: TokenTypes;
  value: string;
}

export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current = 0;
  while (current < code.length) {
     
    const WHITESPACE =/\s/
    let char = code[current];
    console.log('char===',{char:current})
    if(WHITESPACE.test(char)){
        current++;
        continue;
    }

    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char) && current < code.length) {
        value += char;

        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      });

    }
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      console.log('number',value);
      while (NUMBERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });

    }
  }

  console.log("tokens:", tokens);
  return tokens;
}
