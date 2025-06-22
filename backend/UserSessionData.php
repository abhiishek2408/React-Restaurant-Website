session_start();

header('Content-Type: application/json');

// Check if the session is set and return the user data
if (isset($_SESSION['user'])) {
    echo json_encode(['user' => $_SESSION['user']]);
} else {
    echo json_encode(['user' => null]);  
}


//Frontend
In your React app, you can make an HTTP request to this PHP API endpoint (using fetch, axios, or any other library) to retrieve the session data.

Example using fetch:

js
Copy code
import { useEffect, useState } from 'react';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from the PHP onlinerestro/backend
        fetch('http://your-php-onlinerestro/backend.com/api/getUser.php')
            .then(response => response.json())
            .then(data => {
                setUser(data.user);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.name}</h1>
            ) : (
                <h1>Please log in</h1>
            )}
        </div>
    );
};

export default App;

