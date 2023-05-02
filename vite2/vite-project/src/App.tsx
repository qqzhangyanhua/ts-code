import { useState } from "react";
import MyApp from "./components/Myapp";
import MyApp2 from "./components/Myapp2";
import MyApp3 from "./components/Myapp3";
import MyApp4 from "./components/Myapp4";

import {List} from './components/Header/List'

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			{/* <MyApp/>
			<MyApp2/>
			<MyApp3/>
			<MyApp4/> */}
			<List/>
		</div>
	);
}

export default App;
