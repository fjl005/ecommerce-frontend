import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [username, setUsername] = useState('');

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage username={username} />} />
                    <Route path='/login' element={<LoginPage username={username} setUsername={setUsername} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
