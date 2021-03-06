import './App.css';
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

//? in route path means that id is optional

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
        <Route exact path="/order/:id" component={OrderScreen}/>
        <Route exact path="/order" component={PlaceOrderScreen}/>
        <Route exact path="/payment" component={PaymentScreen}/>
        <Route exact path="/ship" component={ShippingScreen}/>
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route exact path="/profile" component={ProfileScreen}/>
          <Route exact path="/product/:id" component={ProductScreen}/>
          <Route exact path="/cart/:id?" component={CartScreen}/> 
          <Route  path="/" component={HomeScreen} exact/>
  
     </Container>
     </main>
     <Footer/>
     </Router>
  );
}

export default App;
