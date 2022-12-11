import React from 'react';
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Typography, ButtonGroup, Badge } from '@mui/material';
import { Add, Remove, ShoppingCart } from '@mui/icons-material/';
import './styles.css';

const List = ({ items, cart, handleAddCartItem, handleDeleteCartItem, cartAmount }) => {
    console.log(items)
    return (
        <div className='items-list'>
            <div style={{ textAlign: "right" }}>
                <Badge badgeContent={cartAmount} color="primary">
                    <Button size='large' component={Link} to="/shoppingcart" variant="contained" color='success' endIcon={<ShoppingCart />}>
                        Shopping Cart
                    </Button>
                </Badge>
            </div>
            {items.map(item =>
                <div className='item-card'>
                    <Card className='card' key={item["_id"]}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="h3">
                                {item.name}
                            </Typography>
                            <Typography variant='h5'>
                                Price: {item.price}
                            </Typography>
                            <Typography variant='h5'>
                                Description: {item.description}
                            </Typography>
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
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={item.image}
                        />
                    </Card >
                </div>)
            }
        </div >
    );
}

export default List;