import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, CardMedia, Typography, Badge, ButtonGroup, Divider } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './styles.css'

const Cart = ({ cart, handleDeleteCartItem, handleAddCartItem, handleSendOrder }) => {

    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        let price = 0;
        cart.forEach(item => {
            price += item.price * item.amount;
        });
        setTotalPrice(price);
    }, [cart]);

    if (cart.length === 0) {
        return (
            <Typography gutterBottom variant="h5" component="div">
                Theres no items in shopping cart
            </Typography>
        )
    } else {
        let shoppingCartCards = cart.map(item => {
            return (
                <div key={item.id} style={{ margin: "2%" }}>
                    <Badge badgeContent={item.amount} color="primary">
                        <Card sx={{ width: 300, height: 450 }}>
                            <CardMedia
                                width={300}
                                height={300}
                                component="img"
                                image={item.image}
                            />
                            <CardContent className='product-card-content'>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup>
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => {
                                            handleDeleteCartItem(item)
                                        }}
                                    >
                                        <Remove fontSize="small" />
                                    </Button>
                                    <Button
                                        disabled
                                    >
                                        {cart.find(i => i["_id"] === item["_id"]) ? item.amount : 0}
                                    </Button>
                                    <Button
                                        aria-label="increase"
                                        onClick={() => {
                                            handleAddCartItem(item)
                                        }}
                                    >
                                        <Add fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    </Badge>
                </div>
            );
        });
        return (
            <>
                <div >
                    <Typography variant="h5">
                        Total Price: {totalPrice}
                    </Typography>
                    <Button variant='contained' onClick={handleSendOrder}>
                        Send Order
                    </Button>
                </div>
                <Divider sx={{ my: 3 }} />
                <div className="cart-cards">
                    {shoppingCartCards}
                </div>
            </>
        )
    }
}

export default Cart;