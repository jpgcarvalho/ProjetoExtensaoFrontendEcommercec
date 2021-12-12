import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import { publicRequest } from '../requestMethods'
import { mobile } from '../responsive'

const Container = styled.div`
    background-image: radial-gradient( circle 953px at 10% 20%,  rgba(22,79,141,1) 0%, rgba(13,16,47,1) 100.2% );
`

const FormContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({width: "75%"})}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form `
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    font-size: 18px;
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin-bottom: 10px;
    background-image: radial-gradient( circle 953px at 10% 20%,  rgba(22,79,141,1) 0%, rgba(13,16,47,1) 100.2% );
    color: white;

    cursor: pointer;
    
    &:disabled {
        color: green;
        cursor: not-allowed;
    }

`
const Error = styled.span`
    color: red;
`

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState()
    const history = useHistory()


    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await publicRequest.post('/users/forgot_password', {email: email})
            history.push('/reset_password')
        } catch (error) {
            console.log(error)
            setError("Não existe conta com email fornecido")
        }
    }

    return (
        <Container>
            <FormContainer>
                <Wrapper>
                    <Title>Redefinição de Senha</Title>
                    <Form>
                        <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                        {error && (<Error>{error}</Error>)}
                        <Button onClick={handleClick}>Enviar</Button>
                    </Form>
                </Wrapper>
            </FormContainer>
            <Footer color="white"/>
        </Container>
    );
}

export default ForgotPassword 
