export function List() {
	return (
		<div className="flex ml-6">
            <ul>
               {[1,2,3,4].map((el)=><li className="bg-red-200 h-14 w-14 mt-6 flex items-center justify-center">p{el}</li>)}
               
            </ul>
            <ul className="ml-6">
            {[1,2,3,4].map((el)=><li className="bg-red-200 h-14 w-14 mt-6  flex items-center justify-center">p{el}</li>)}
                
            </ul>
		
		</div>
	);
}
