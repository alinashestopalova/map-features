import React, { Component } from 'react'
import OlMap from 'ol/Map';
import './MapContainer.css'
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import {fromLonLat} from "ol/proj";
import Circle from "ol/style/Circle";
import Overlay from "ol/Overlay";

class MapContainer extends Component{
    state = {
        popoverName: '',
        popoverEmail: '',
        zoom: 2,
        point: []
    }

    iconStyle = new Style({
        image: new Circle({
            radius: 5,
            fill: new Fill({
                color: 'rgba(255,0,0,0.9)'
            })
        })
    });

    newFeatures = [...this.props.features]
    features = this.newFeatures.map((item)=>{
        let newF =  new Feature({
            geometry: new Point(
                fromLonLat(item.geometry.coordinates)
            ),
            name: item.properties.userName,
            email: item.properties.email,
            population: 4000,
            rainfall: 500
        });
        newF.setStyle(this.iconStyle);
        return newF
    });


    vectorSource = new VectorSource({
        features: this.features
    });

    vectorLayer = new VectorLayer({
        source: this.vectorSource
    });

    rasterLayer = new TileLayer({
        source: new OSM()
    });

    map = new OlMap({
        layers: [this.rasterLayer, this.vectorLayer],
        target: document.getElementById('map'),
        view: new View({
            center: fromLonLat([37.622504, 55.753215]),
            zoom: this.state.zoom
        })
    });


    componentDidMount() {
        this.map.setTarget("map")
        const element = document.getElementById('popup');
        const popup = new Overlay({
            element: element,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -10]
        });

        this.map.addOverlay(popup);

        this.map.on('click', (evt) => {
            const feature = this.map.forEachFeatureAtPixel(evt.pixel,
                function(feature) {
                    return feature;
                });
            if (feature) {
                this.setState({
                    popoverName: feature.get('name'),
                    popoverEmail: feature.get('email'),
                    zoom: 8,
                    point: feature.getGeometry().getCoordinates()
                })
                this.map.setView(new View({
                    center: (this.state.point),
                    zoom: this.state.zoom
                }));
            }
        });
    }

    componentDidUpdate() {
        let newFeatures = [...this.props.features]
        let features = newFeatures.map((item)=>{
            let newF =  new Feature({
                geometry: new Point(
                    fromLonLat(item.geometry.coordinates)
                ),
                name: item.properties.userName,
                email: item.properties.email,
                population: 4000,
                rainfall: 500
            });
            newF.setStyle(new Style({
                image: new Circle({
                    radius: 5,
                    fill: new Fill({
                        color: item.properties.color
                    })
                })
            }));
            return newF
        });
        this.vectorLayer.setSource(
            new VectorSource({
                features: features
            })
        );
    }

    render(){
        let popover = ''
        if (this.state.popoverName && this.state.popoverEmail){
            popover =  <div id="popover"><p>Name: {this.state.popoverName}</p><p>Email: {this.state.popoverEmail}</p></div>
        }
        return(
            <div id="map">
                <div id="popup"></div>
                {popover}
            </div>
        )
    }
}

export default MapContainer