import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    return (
        <div>
            <h1>Hello, React with Laravel!!!</h1>
            <p> Blah Blah <br></br>Blah Geeneth </p>
        </div>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}