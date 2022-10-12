
import {Token, TokenTypes} from './tokenizer'

enum NodeTypes{
    Root,
    Number
}
interface Node{
    type: string;
}
interface RootNode extends Node{
    body:NumberNode[]
}
interface NumberNode extends Node{
    value:string
}
export function parser(tokens: Token[]){
    let current = 0;
    let token = tokens[current]
    const rootNode:RootNode = {
        type:'Program',
        body:[]
    }
    if(token.type === TokenTypes.Number){
        const numberNode:NumberNode = {
            type:'Number',
            value:token.value
        }
        rootNode.body.push(numberNode)
    }
    return rootNode
}