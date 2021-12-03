import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const Canceled = () => {
    return (
        <div>
            <h1>PEDIDO CANCELADO</h1>
            <Link to="/">
                <p>Voltar para o Ecommerce</p>
            </Link>
        </div>
    )
}


export default Canceled