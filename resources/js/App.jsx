import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import Login from './Login';
import Register from './Register';

function App() {
    return (
        <div>
            <h1>Hello, React with Laravel!!!</h1>
            <p> Blah Blah <br></br>Blah Geeneth </p>
            <br /><br />
            <Login />
            <br /><br />
            <Register />
        </div>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
