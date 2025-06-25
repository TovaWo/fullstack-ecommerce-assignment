import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { store } from './store';
import ShoppingList from './components/ShoppingList';
import OrderSummary from './components/OrderSummary';

function App() {
  return (
    <Provider store={store}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<ShoppingList />} />
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </Router>
    </Provider>
  );
}

export default App;