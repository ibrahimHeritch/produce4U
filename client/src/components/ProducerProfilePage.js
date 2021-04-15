import React, {Component} from 'react';
import '../ProducerProfile.css';


class ProducerProfilePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            producer:{
                image: "https://media.istockphoto.com/photos/farmer-in-a-soybean-field-agricultural-concept-picture-id1158664559?k=6&m=1158664559&s=612x612&w=0&h=gKaS2VdqyJZKAJMFTOZDZC72oVYFwXt7PqcDdqcfCSw=",
                name: "Perdu Farms",
                description: "Since 2015, Perdu Farms has been committed to growing organic produce. Our mission is to build community through education, food accessibility, and by being a model of appropriate land stewardship and sustainable agriculture techniques.",
                location: "University City South, Charlotte, NC 28262",
                longitude: 35.308076,
                latitude: -80.733726,
            }

        };

    }

    render() {

        return(


            <div>
                <p id="p1" className="produce4U-producerWelcome">Know<span className="produce4U-blacktext"> Your Farmer</span></p>
                <p id = "p2" className="produce4U-producerWelcome"> Love<span className="produce4U-blacktext"> Your Food</span><br></br></p>
                <img className="produce4U-producerPhoto" src={this.state.producer.image}></img><br></br>
                <p id = "p3" className="produce4U-producerName">{this.state.producer.name} <br></br><br></br><span className="produce4U-producerText">{this.state.producer.description}</span></p>
                <p id = "p4" className = "produce4U-producerLocation"> Location</p>

            </div>






        );
    }
}


export default ProducerProfilePage;