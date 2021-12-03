import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Footer from '../components/Footer'
import NewsLetter from '../components/NewsLetter'
import { mobile } from '../responsive'


const Container = styled.div``
const Title = styled.h2``
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column"})}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0" })}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`

const Option = styled.option``

const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("Mais recente")

    const handleFilters = (e) => {
        const value = e.target.value
        setFilters({
            ...filters,
            [e.target.name]:  value.toLowerCase()
        })
    }

    return (
        <Container>
            <Announcement />
            <NavBar />
            <Title>{cat.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filtrar por:</FilterText>
                    <Select name="productColor" onChange={handleFilters}>
                        <Option disabled>Cor</Option>
                        <Option value="white">Branco</Option>
                        <Option value="black">Preto</Option>
                        <Option value="red">Vermelho</Option>
                        <Option value="blue">Azul</Option>
                        <Option value="yellow">Amarelo</Option>
                        <Option value="green">Verde</Option>
                    </Select>
                    <Select name="productSize" onChange={handleFilters}>
                        <Option disabled>Tamanho</Option>
                        <Option>P</Option>
                        <Option>M</Option>
                        <Option>G</Option>
                        <Option>GG</Option>
                        <Option>EXG</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Ordenar por:</FilterText>
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option value="newest">Mais recente</Option>
                        <Option value="asc">Preço (crescente)</Option>
                        <Option vlaue="desc">Preço (decrescente)</Option>

                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <NewsLetter />
            <Footer />
            
        </Container>
    )
}

export default ProductList
