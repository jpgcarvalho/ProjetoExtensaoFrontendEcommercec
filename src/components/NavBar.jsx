import React from 'react'
import styled from 'styled-components'

import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/apiCalls'




const Container = styled.div`
    height: 60px;
    border-bottom: 1px solid #95a5a6;
    ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ marginLeft: "5px" })}

`

const Input = styled.input`
    border: none;
    width: 100%;
    font-size: 14px;

    &:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }
    ${mobile({ width: "55px" })}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "18px" })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center", flex: 2 })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
    
`

const NavBar = () => {
    const user = useSelector(state => state.user.currentUser)
    const quantity = useSelector(state => state.cart.quantity)
    const dispatch = useDispatch()

    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await logout(dispatch)
            window.location.reload(false)
            localStorage.removeItem("persist:root")
        }catch(error){
            console.log(error)
        }
    }




    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <Logo>Ecommerce</Logo>
                    </Link>
                </Left>
                <Center>
                    <SearchContainer>
                        <Input placeholder="Pesquisar" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Center>
                <Right>
                    { user ? (
                        <>
                            <span>Olá, {user.name}</span>
                            <button onClick={handleClick}>Sair</button>
                        </>
                    )
                    : (
                    <>
                        <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                            <MenuItem>CRIAR CONTA</MenuItem>
                        </Link>
                        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                            <MenuItem>LOGIN</MenuItem>
                        </Link>
                    </>

                    )}
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
}

export default NavBar
