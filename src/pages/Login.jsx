import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import { login } from '../redux/apiCalls'
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
const Link = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)
    const history = useHistory()


    const handleClick = async (e) => {
        e.preventDefault()
        await login(dispatch, { email, password })  
        history.goBack()

    }

    return (
        <Container>
            <FormContainer>
                <Wrapper>
                    <Title>Iniciar Sessão</Title>
                    <Form>
                        <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button onClick={handleClick} disabled={isFetching}>Iniciar Sessão</Button>
                        {error && <Error>Alguma coisa deu errado... Verifique se eles estão corretos</Error>}
                        <Link>Esqueceu a Senha?</Link>
                        <Link>Criar uma nova Conta</Link>
                    </Form>
                </Wrapper>
            </FormContainer>
            <Footer color="white"/>
        </Container>
    );
}

export default Login
