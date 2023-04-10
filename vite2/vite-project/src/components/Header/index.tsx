import style from "./index.module.scss";
export function Header() {
	
	return (
		<div >
      This is Header
			<span bg="blue-600">13123</span>
			<button
				bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
				text="sm white"
				font="mono light"
				p="y-2 x-4"
				border="2 rounded blue-200"
			>
        Button
			</button>
		
		</div>
	);
}
