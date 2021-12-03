import { Send } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
`
const Title = styled.h1`
    font-size: 50px;
    margin-bottom: 20px;
    ${mobile({ textAlign: "center" })}
`

const Desc = styled.div`
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: "center" })}
`

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: "70%"})}
`

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;

    &:focus {
        outline: none;
    }
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }
    
`

const NewsLetter = () => {
    return (
        <Container>
            <Title>Se conecte com a gente! 😍 </Title>
            <Desc>Cadastre-se e receba as nossas novidades por e-mail!</Desc>
            <InputContainer>
                <Input placeholder="E-mail"/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    )
}

export default NewsLetter
