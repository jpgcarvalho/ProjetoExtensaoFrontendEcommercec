import { SpaRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import { register } from '../redux/apiCalls'
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
    width: 40%;
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
    flex-wrap: wrap;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin-top: 20px;
    background-image: radial-gradient( circle 953px at 10% 20%,  rgba(22,79,141,1) 0%, rgba(13,16,47,1) 100.2% );
    color: white;

    cursor: pointer;
    
`


const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: "90%"})}
    margin: 20px 10px 0 0;
`
const ShowButton = styled.button`
    flex: 1;
`

const InputPassword = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`

const Register = () => {
    const [inputs, setInputs] = useState({})
    const dispatch = useDispatch()
    const { error } = useSelector(state => state.user)
    const [passwordShown, setPasswordShown] = useState(false)


    const handleSubmit = async (e) => {
            e.preventDefault()
            await register(dispatch, inputs)

    }

    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    return (
        <Container>
            <FormContainer>
                <Wrapper>
                    <Title>Criar Conta</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input name="name" placeholder="Nome" required  onChange={handleChange}/>
                        <Input name="email" placeholder="Email" type="email" required onChange={handleChange} />
                        <Input name="phone" placeholder="Telefone" type="tel" pattern="[0-9]{3}[0-9]{1}[0-9]{4}[0-9]{4}" required onChange={handleChange} />
                        <InputContainer>
                            <InputPassword name="password" placeholder="Senha" type={passwordShown ? "text" : "password"} required onChange={handleChange} />
                            <ShowButton onClick={togglePassword}>Mostrar senha</ShowButton>
                        </InputContainer>
                        <Button type="submit">Criar</Button>
                        {error && <span>Alguma coisa deu errado... Verifique se os dados estão corretos</span>}
                    </Form>
                </Wrapper>
            </FormContainer>
            <Footer color="white"/>
        </Container>
    );
}

export default Register
