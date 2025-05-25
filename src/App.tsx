import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';

import Home from 'pages/home/index';
import Room from 'pages/room/index';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />}/>
        </Routes>
      </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
