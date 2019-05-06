import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './PersonItem.css'

const PersonItem = (props) =>{
    return(
        <Container>
            <Row>
                <Col lg={2} md={4} xs={4}>
                    <img className='personPhoto' src={props.avatar}/>
                </Col>
                <Col lg={10} md={4} xs={4}>
                    <div>{props.name}</div>
                    <div>{props.email}</div>
                </Col>
            </Row>
        </Container>
    )
}

export default PersonItem