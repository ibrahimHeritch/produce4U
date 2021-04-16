import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


class MapCreator extends Component {
    static defaultProps = {
        center: {lat: -80.733726, lng: 35.308076},
        zoom: 11
    };

    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                <AnyReactComponent
                    lat={-80.733726}
                    lng={35.308076}
                    text={'Perdu Farms'}
                />
            </GoogleMapReact>
            </div>
        );
    }

}

export default MapCreator;
