import React from 'react';

function App() {
    // Function to send data to the backend
    const sendDataToBackend = async () => {
        // Sample data to send
        const data = {
            name: "John Doe",
            email: "john@example.com"
        };

        try {
            // Send POST request to the backend
            const response = await fetch("http://localhost/backend/add_to_cart.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // Parse the JSON response from the backend
            const result = await response.json();
            console.log("Response from backend:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="App">
            <h1>Send Data from React to PHP</h1>
            <button onClick={sendDataToBackend}>Send Data</button>
        </div>
    );
}

export default App;
