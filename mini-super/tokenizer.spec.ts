import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "./tokenizer";
test.skip("tokenizer", () => {
  const code = ` (add 2 (subtract 4 2))`;
  const tokens = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "paren", value: "(" },
    { type: "name", value: "subtract" },
    { type: "number", value: "4" },
    { type: "number", value: "2" },
    { type: "paren", value: ")" },
    { type: "paren", value: ")" },
  ];
 expect( tokenizer(code)).toEqual(tokens)
});
test(' left-paren',()=>{
  const code = '(';
  const tokens = [{type: TokenTypes.Paren, value:"("}]
  expect(tokenizer(code)).toEqual(tokens)
})
test(' right-paren',()=>{
  const code = ')';
  const tokens = [{type: TokenTypes.Paren, value:")"}]
  expect(tokenizer(code)).toEqual(tokens)
})
test('add',()=>{
  const code = 'add';
  const tokens = [{type: TokenTypes.Name, value:"add"}]
  expect(tokenizer(code)).toEqual(tokens)
})
test('number',()=>{
  const code = '22222';
  const tokens = [{type: TokenTypes.Number, value:"22222"}]
  expect(tokenizer(code)).toEqual(tokens)
})

test("add(1 2)", () => {
  const code =`(add 8 2)`;
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "8" },
    { type:TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
  ];
 expect( tokenizer(code)).toEqual(tokens)
});