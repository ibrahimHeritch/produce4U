import React, {Component} from 'react';
import '../styles/ProducerProfile.css';
import GoogleMapReact from 'google-map-react';
import profile from '../resources/pictures/defualt_profile.png'
import ScrollableProduce from '../components/ScrollableProduce'
import ScrollReviews from '../components/ScrollReviews'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ProducerProfilePage extends Component{




    static defaultProps = {
        center: {lat: 35.308076, lng: -80.733726},
        zoom: 12
    }

    constructor(props){


        super(props);
        this.state = {
            user: null,
            isBan: false,
            isFollowing:false


        };
        this.state = { isToggleOn: true };
        this.handleClick = this.handleClick.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:9000/user?username="+this.props.match.params.username)
          .then(res => res.text())
          .then(res => this.setState({user: JSON.parse(res)},
          ()=>{
            fetch("http://localhost:9000/user/isFollowing?username="+this.props.user.username+"&producer=")
              .then(res => res.text())
              .then(res => this.setState({isFollowing: JSON.parse(res)}))
              .catch(err => err)
          }
        ))
          .catch(err => err)




    }

    handleClick() {
        this.setState({ isBan: true });
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    handleFollow() {
        this.setState({ isFollowing: !this.state.isFollowing });
        if(!this.state.isFollowing){
          fetch("http://localhost:9000/user/follow", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username:this.props.user.username,producer:this.state.user.username})
          }).then(function (response) {
            console.log(response)
            return response.json();
          });
        }else{
          fetch("http://localhost:9000/user/unfollow", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username:this.props.user.username,producer:this.state.user.username})
          }).then(function (response) {
            console.log(response)
            return response.json();
        })
      }
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




              { this.state.isBan &&
                    <button className="produce4U-red-button" onClick={this.props.onClick}>{this.state.isToggleOn ? 'Block' : 'Blocked'}</button>
                }


         <div className="producer-info">
                <img className="produce4U-producerPhoto" src={this.state.user.profile_picture?this.state.user.profile_picture:profile}/>
                <p className="produce4U-producerName">{this.state.user.farm_name}   &nbsp;    <button className="produce4U-green-button" onClick={this.handleFollow}>{this.state.isFollowing?"UnFollow":"Follow"}</button><br/><span className="produce4U-producerText">{this.state.user.description?this.state.user.description:"No Description"}</span></p>
         </div>


                  <div className="location-info" >
                        <p className= "produce4U-producerLocation"> Location</p>
                        <p className="produce4U-locationText">{this.state.user.farm_name} is located at {this.state.user.address_line_one+" "+this.state.user.address_line_two+" "+this.state.user.city+" "+this.state.user.state+" "+this.state.user.country+" "+this.state.user.zip_code}</p>
                        <div style={{ height: '600px', width: '90%', margin:"auto"}}>
                          <GoogleMapReact
                              bootstrapURLKeys={{key:'GOOGLE_KEY_GOES_HERE CHANGE THIS BEFORE RUNNING', language: 'en', region: 'US'}} 
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
                    <div className={"reviews-info"} >
<p className = "produce4U-producerReviewHeader">Reviews</p>
                        <ScrollReviews producer={this.state.user.username} fetch_by="producer"/>
                    </div>

                    <div className="producer-products">
                          <p>
                            <span>My Products:</span>

                          </p>
                          <ScrollableProduce username={this.state.user.username} />
                    </div>




</div>




        );
    }


}


export default ProducerProfilePage;
