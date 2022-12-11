import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Container, Typography, Divider } from '@mui/material';
import List from './components/List/index';
import Cart from './components/Cart/index';
import './App.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/")
      .then(({ data }) => {
        setItems(data.data);
      }).catch(err => console.error(err));
  }, [])

  const navigate = useNavigate();

  const handleAddCartItem = (item) => {
    let cartItem = cart.find(i => item["_id"] === i["_id"]);
    if (cartItem) {
      cartItem["amount"]++;
      let newCart = cart.filter(i => item["_id"] !== i["_id"]);
      setCart([...newCart, cartItem])
    }
    else {
      cartItem = items.find(i => i["_id"] === item["_id"]);
      cartItem.amount = 1;
      setCart([...cart, cartItem]);
    }
    setCartAmount(cartAmount + 1);
    console.log(cart);
  }

  const handleDeleteCartItem = (item) => {

    let cartItem = cart.find(i => item["_id"] === i["_id"]);
    if (cartItem) {
      setCartAmount(Math.max(cartAmount - 1, 0));
      if (cartItem.amount === 1) {
        let newCart = cart.filter(i => i["_id"] !== item["_id"]);
        setCart(newCart);
      } else {
        let newCart = cart.filter(i => i["_id"] !== item["_id"]);
        cartItem.amount--;
        setCart([...newCart, cartItem]);
      }
    }
  }

  const handleSendOrder = () => {
    axios.post("http://localhost:8000/", cart)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          title: 'Your Order Has Been Saved!',
          showConfirmButton: false,
          timer: 1500
        });
        setCart([]);
        setCartAmount(0);
        navigate('/');
      }).catch(err => {
        Swal.fire({
          icon: "error",
          title: 'Your Order faild!',
          showConfirmButton: false,
          timer: 1500
        });
        console.error(err);
      })
  }

  return (
    <div className="App" >
      <Container>
        <Typography variant='h2'>My Shopping List</Typography>
        <Divider sx={{ my: 5 }} variant="middle"></Divider>
        <Routes>
          <Route exact path='/' element={<List items={items} cart={cart} cartAmount={cartAmount} handleAddCartItem={handleAddCartItem} handleDeleteCartItem={handleDeleteCartItem} />} />
          <Route exact path='shoppingcart' element={<Cart cart={cart} handleSendOrder={handleSendOrder} handleDeleteCartItem={handleDeleteCartItem} handleAddCartItem={handleAddCartItem} />} />
        </Routes>
      </Container>
    </div >
  );
}

export default App;
