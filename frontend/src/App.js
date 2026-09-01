import { useEffect, useState } from "react";
import api from "./api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/test")
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>React Frontend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;