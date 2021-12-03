import React from 'react'
import { useHistory, Link } from 'react-router-dom'

const Success = () => {
    const history = useHistory()
   
    return(
        <div>
            <h1>PEDIDO EFETUADO COM SUCESSO</h1>
            <Link to="/">
                <p>Voltar para o Ecommerce</p>
            </Link>

        </div>
    )
       
       
       
}


export default Success