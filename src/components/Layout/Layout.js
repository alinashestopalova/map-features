import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SideBar from '../SideBar/SideBar'
import Map from '../Map/MapContainer'
import axios from "axios/index";

class Layout extends Component{
    state = {
        features: []
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:3000/features')
            .then(response => {
                this.setState({features: response.data.features})
            })
    }

    render(){
        return (
            <Container fluid="true">
                <Row>
                    <Col lg={4} md={4} xs={6}>
                        <SideBar features={this.state.features}/>
                    </Col>
                    <Col lg={8} md={8} xs={6}>
                        <Map features={this.state.features}/>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Layout