import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'

import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import NewsLetter from '../components/NewsLetter'
import { mobile } from '../responsive'
import axios from 'axios'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`
const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: ${props=>props.color};
    margin: 0 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption= styled.option``

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;

`

const Button = styled.button`
    padding: 15px;
    cursor: pointer;
    background-color: white;
    border: 2px solid teal;
    border-radius: 10px;
    transition: all 0.2s ease;

    &:hover {
        background-color: teal;
        color: white;
    }

`

const Product = () => {
    const history = useHistory()
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get("http://localhost:3333/api/products/" + id)
                setProduct(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if(type === "dec"){
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = () => {
        dispatch(
            addProduct({ ...product, quantity, productColor: color, productSize: size})
        )
        history.push('/cart')

    }


    return (
        <Container>
            <Announcement />
            <NavBar />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.productImage} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.productName}</Title>
                    <Desc>{product.productDescription}</Desc>
                    <Price>R$ {product.productPrice}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Cor</FilterTitle>
                            {product.productColor?.map((c) => (
                                <FilterColor color={c} key={c} onClick={()=>setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Tamanho</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.productSize?.map((size) => (
                                    <FilterSizeOption value={size} key={size}>{size.toUpperCase()}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>COMPRAR</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewsLetter />
            <Footer />
            
        </Container>
    )
}

export default Product
