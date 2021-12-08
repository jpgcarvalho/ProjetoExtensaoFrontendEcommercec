import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Success = () => {
    const user = useSelector(state => state.user.currentUser)

    useEffect(() => {
        
    }, [])
   
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