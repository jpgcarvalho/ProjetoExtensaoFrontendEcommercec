import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart'
import Success from './pages/Success';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Canceled from './pages/Canceled';
import ScrollToTop from './components/ScrollToTop';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {

  const user = useSelector(state => state.user.currentUser)

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/products">
          <ProductList/>
        </Route>
        <Route path="/products/:category">
          <ProductList/>
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/canceled">
          <Canceled />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/forgot_password">
          {user ? <Redirect to="/" /> : <ForgotPassword />}
        </Route>
        <Route path="/reset_password">
          {user ? <Redirect to="/" /> : <ResetPassword />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
