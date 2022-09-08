import "./App.css";

import Navbar from "./Components/Navigation/Navbar";

function App() {
	// useEffect(() => {
	// 	if (userData.email !== "") {
	// 		// alert("old state retrieved using token!");
	// 		console.log(userData);
	// 	}
	// }, [userData]);

	return (
		<div className="App">
			<Navbar />
		</div>
	);
}

export default App;
