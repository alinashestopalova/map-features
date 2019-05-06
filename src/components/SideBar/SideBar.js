import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import './SideBar.css'
import PersonItem from './PersonItem/PersonItem'

class Sidebar extends Component{
    render(){
        return(
            <ListGroup className="SideBar">
                {this.props.features.map((item)=>{
                    return(
                        <ListGroup.Item
                            key={item.properties.id}
                        >
                            <PersonItem
                                name={item.properties.userName}
                                email={item.properties.email}
                                avatar={item.properties.avatar}
                            />
                        </ListGroup.Item>
                    )
                })}

            </ListGroup>
        )
    }
}

export default Sidebar