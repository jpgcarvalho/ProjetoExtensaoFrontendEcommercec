import React, { useState } from 'react'
import { useEffect } from 'react'
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

const ResetPassword = () => {

    const [email, setEmail] = useState("")
    const [codigo, setCodigo] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [dontMatch, setDontMatch] = useState()
    const history = useHistory()


    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await publicRequest.post('/users/reset_password', {email, password, token: codigo})
            alert('senha redefinida com sucesso')
            history.push('/login')
        } catch (error) {
            console.log(error)
            setError("Não existe conta com email fornecido")
            setDontMatch('Senhas não coincidem')
        }

    }

    useEffect(() => {
        password !== confirmPass ? setDontMatch('Senhas não coincidem')  : setDontMatch()

    }, [password, confirmPass])

    return (
        <Container>
            <FormContainer>
                <Wrapper>
                    <Title>Redefinição de Senha</Title>
                    <Form>
                        <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Código" type="text" onChange={(e) => setCodigo(e.target.value)} />
                        <Input placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <Input placeholder="Confirmar Senha" type="password" onChange={(e) => setConfirmPass(e.target.value)} />
                        {dontMatch && (<Error>{dontMatch}</Error>)}
                        {error && (<Error>{error}</Error>)}
                        <Button onClick={handleClick}>Enviar</Button>
                    </Form>
                </Wrapper>
            </FormContainer>
            <Footer color="white"/>
        </Container>
    );
}

export default ResetPassword
