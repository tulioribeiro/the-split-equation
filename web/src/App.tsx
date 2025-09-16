import { useEffect } from "react";
import { API_URL } from "./config/consts";

function App() {
  async function checkAPIHealth() {
    const res = await fetch(`${API_URL}/health`);

    const data = await res.json();

    console.log(data);
  }

  useEffect(() => {
    checkAPIHealth();
  }, []);

  return <h1>Hello world!</h1>;
}

export default App;
