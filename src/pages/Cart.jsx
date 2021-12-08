import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import { userRequest } from '../requestMethods'
import { useStripe } from '@stripe/react-stripe-js'
import { useDispatch } from 'react-redux'
import { remQuant, removeProduct, resetCart } from '../redux/cartRedux'
import { useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';



const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;

    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid black;

    background-color: ${props => props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 2px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    
    &:hover {
        cursor: pointer;
    }
`

const Cart = () => {
    const stripe = useStripe()
    const cart = useSelector(state => state.cart) 
    const user = useSelector(state => state.user.currentUser)
    const history = useHistory()
    const dispatch = useDispatch()


    console.log(cart.products)
    const handleClick = async () => {
        if(!user){
            history.push('/login')
        } else {

            const line_items = cart.products.map(item => {
                return{
                    quantity: item.quantity,
                    price_data: {
                        currency: 'brl',
                        unit_amount: item.productPrice * 100,
                        product_data: {
                            name: item.productName,
                            description: item.productDescription,
                                images: [item.productImage]
                        }
                        
                    }
                }
            })

            const email = user.email

            const response = await userRequest.post('/checkout/payment', { line_items, customer_email: email})

            dispatch(resetCart())

            const { sessionId } = response.data

            const { error } = await stripe.redirectToCheckout({
                sessionId
            })

            if(error) {
                console.log(error)
            }
        }
    }

    const handleDelete = (product) => {
        dispatch(removeProduct(product))

    }

    const handleQuantity = (type, product) => {
        if(type === 'dec'){
            product.quantity > 1 && dispatch(remQuant(product)) 
        }
    }

    return (
        <Container>
            <Announcement />
            <NavBar />
            <Wrapper>
                <Title>Seu Carrinho</Title>
                <Top>
                    <TopButton>Continuar Comprando</TopButton>
                    <TopTexts>
                        <TopText >Carrinho de Compras({cart.quantity})</TopText>
                    </TopTexts>
                    <TopButton type="filled" onClick={() => dispatch(resetCart())}>Finalizar Compra</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product, index) => (
                            <Product key={index}>
                            <ProductDetail>
                                <Image src={product.productImage} />
                                <Details>
                                    <ProductName><b>Produto:</b> {product.productName}</ProductName>
                                    <ProductId><b>ID:</b> {product._id}</ProductId>
                                    <ProductColor color={product.productColor} />
                                    <ProductSize><b>Tamanho:</b> {product.productSize.toUpperCase()}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Remove onClick={() => handleQuantity('dec', product)} />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Add onClick={() => handleQuantity('inc', product)} />
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.productPrice*product.quantity}</ProductPrice>
                                <DeleteIcon onClick={() => handleDelete(product)} style={{cursor: 'pointer'}}/>
                            </PriceDetail>
                        </Product>
                        
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>Resumo</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>SubTotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Preço da Entrega</SummaryItemText>
                            <SummaryItemPrice>$ 10</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Desconto</SummaryItemText>
                            <SummaryItemPrice>$ -10</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                          <Button onClick={handleClick}>Comprar</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
