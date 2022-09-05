/*
 * @Author: ZYH
 * @Date: 2022-09-05 18:03:38
 * @LastEditTime: 2022-09-05 18:18:30
 * @Description: 
 */
// (candidates = [2, 3, 6, 7]), (target = 7);
// (candidates = [2, 3, 5]), (target = 8);
function combinationSum(candidates: number[], target: number): number[][] {
   const results:number[][]  = []  ;
   const result: number[]= [];
   if(candidates.length==0){
    return [[]] ;
   }
   const process =(preResult: number[],candidates: number[], target: number,start:number)=>{
    if(target<0){
        //小于0 直接结束
        return;
    }
    if(target===0){
        results.push(preResult);
    }
    for(let i = start; i<candidates.length; i++) {
        const num = candidates[i];
        process([...preResult,num],candidates,target-num,i)

    }
   }
   process(result,candidates,target,0)
   return results
    

};