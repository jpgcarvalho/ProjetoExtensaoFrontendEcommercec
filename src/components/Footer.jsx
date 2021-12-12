import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    color: ${props => props.color === "white" ? "white" : "black"};
    border-top: 1px solid white;
    ${mobile({ flexDirection: "column", })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`

`
const Desc = styled.p`
    margin: 20px 0;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    
    ${mobile({ display: "none" })}
`
const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 20px;
`


const Right = styled.div`
    flex: 1;
    padding: 20px;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`


const Footer = ({color}) => {
    return (
        <Container color={color}>
            <Left>
                <Logo>Ecommerce</Logo>
                <Desc>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, inventore quae? Dolore obcaecati quidem facilis et quo a non ipsum voluptas error, quia eaque voluptate aut voluptates consequatur atque illum!
                </Desc>
                <SocialContainer>
                    <SocialIcon>
                        <Link to="https://facebook.com" style={{ textDecoration: "none", color: color === 'white' ? 'white' : 'black' }}>
                            <Facebook />
                        </Link>
                    </SocialIcon>
                    <SocialIcon>
                        <Link to="/" style={{ textDecoration: "none", color: color === 'white' ? 'white' : 'black' }}>
                            <Instagram/>
                        </Link>
                    </SocialIcon>
                    <SocialIcon>
                        <Link to="/" style={{ textDecoration: "none", color: color === 'white' ? 'white' : 'black' }}>
                            <Twitter/>
                        </Link>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Menu</Title>
                <List>
                    <Link to="/" style={{ textDecoration: "none", color: color === 'white' ? 'white' : 'black' }}>
                        <ListItem>Início</ListItem>
                    </Link>
                    <Link to="/products" style={{ textDecoration: "none", color: color === 'white' ? 'white' : 'black' }}>
                        <ListItem>Produtos</ListItem>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none", color: color === 'white' ? 'white' : 'black' }}>
                        <ListItem>Contato</ListItem>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none", color: color === 'white' ? 'white' : 'black' }}>
                        <ListItem>Saiba</ListItem>
                    </Link>
                </List>
            </Center>
            <Right>
                <Title>Contato</Title>
                <ContactItem><Room style={{marginRight: "10px"}} /> Endereço</ContactItem>
                <ContactItem><Phone style={{marginRight: "10px"}}/> +1 2345 6789</ContactItem>
                <ContactItem><MailOutline style={{marginRight: "10px"}}/> contato@ecommerce.com</ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer
