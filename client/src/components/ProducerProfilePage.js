import React, {Component} from 'react';
import '../styles/ProducerProfile.css';
import GoogleMapReact from 'google-map-react';
import profile from '../resources/pictures/defualt_profile.png'
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ProducerProfilePage extends Component{




    static defaultProps = {
        center: {lat: 35.308076, lng: -80.733726},
        zoom: 12
    }

    constructor(props){


        super(props);
        this.state = {
            user: null



        };

    }

    componentDidMount(){
        fetch("http://localhost:9000/user?username="+this.props.match.params.username)
          .then(res => res.text())
          .then(res => this.setState({user: JSON.parse(res)}))
          .catch(err => err);
    }
/////TODO: do not display address it is null
    render() {

        if(this.state.user==null) return <p>Producer Doesn't exist</p>
        return(

                <div>
            <div>
            <h1 className="produce4U-producerWelcome">Know<span className="produce4U-blacktext"> Your Farmer</span></h1>
             <h2 className="produce4U-producerWelcome"> Love<span className="produce4U-blacktext"> Your Food</span><br></br></h2>
            </div>



         <div className="producer-info">
                <img className="produce4U-producerPhoto" src={this.state.user.profile_picture?this.state.user.profile_picture:profile}/>
                <p className="produce4U-producerName">{this.state.user.farm_name} <br></br><br></br><span className="produce4U-producerText">{this.state.user.description?this.state.user.description:"No Description"}</span></p>
         </div>
                  <div className="location-info">
                        <p className= "produce4U-producerLocation"> Location</p>
                        <p className="produce4U-locationText">{this.state.user.farm_name} is located at {this.state.user.address_line_one+" "+this.state.user.address_line_two+" "+this.state.user.city+" "+this.state.user.state+" "+this.state.user.country+" "+this.state.user.zip_code}</p>
                        <div style={{ height: '600px', width: '90%', margin:"auto"}}>
                          <GoogleMapReact
                              bootstrapURLKeys={{key:'AIzaSyDiAVMs1DJpi5C8bkFHY2WZ6DTDq7K0pU0', language: 'en', region: 'US'}}
                              defaultCenter={{lat: this.state.user.latitude, lng: this.state.user.longitude}}
                              defaultZoom={this.props.zoom}
                              onChildMouseEnter={this.onChildMouseEnter}
                              onChildMouseLeave={this.onChildMouseLeave}
                           >
                           <AnyReactComponent
                                  lat={this.state.user.latitude}
                                  lng={this.state.user.longitude}
                                  text={this.state.user.farm_name}
                            />
                          </GoogleMapReact>



                          </div>

                    </div>


                </div>






        );
    }


}


export default ProducerProfilePage;
