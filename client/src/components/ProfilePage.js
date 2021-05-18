import React, {Component,useState} from 'react';
import '../styles/profile.css';
import editIcon from '../resources/Icons/edit.svg'
import profile from '../resources/pictures/defualt_profile.png'
import Geocode from "react-geocode";
import axios from 'axios';

class ProfilePage extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      user:null,
      editInfo: false,
      editAddress: false,
      newFarmName: "",
      newDescription: "",
      newAddressLineOne: "",
      newAddressLineTwo: "",
      newCity: "",
      newState: "",
      newCountry: "",
      newZipCode: "",

    }

    this.handleInfoSave = this.handleInfoSave.bind(this)
    this.handleAddressSave = this.handleAddressSave.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleAddressSave(){
      let changed = false
      if(this.state.user.address_line_one != this.state.newAddressLineOne){
        this.state.user.address_line_one  = this.state.newAddressLineOne
        changed = true
        this.setState({
            user: this.state.user,
          })
      }
      if(this.state.user.address_line_two != this.state.newAddressLineTwo){
        this.state.user.address_line_two  = this.state.newAddressLineTwo
        changed = true
        this.setState({
            user: this.state.user,
          })
      }
      if(this.state.user.city != this.state.newCity){
        this.state.user.city  = this.state.newCity
        changed = true
        this.setState({
            user: this.state.user,
          })
      }
      if(this.state.user.state != this.state.newState){
        this.state.user.state  = this.state.newState
        changed = true
        this.setState({
            user: this.state.user,
          })
      }
      if(this.state.user.country != this.state.newCountry){
        this.state.user.country  = this.state.newCountry
        changed = true
        this.setState({
            user: this.state.user,
          })
      }
      if(this.state.user.zip_code != this.state.newZipCode){
        this.state.user.zip_code  = this.state.newZipCode
        changed = true
        this.setState({
            user: this.state.user,
          })
      }
      console.log(this.state.user)
      if(changed){
        Geocode.setApiKey('GOOGLE_KEY_GOES_HERE CHANGE THIS BEFORE RUNNING');
        Geocode.fromAddress(this.state.user.address_line_one+" "+this.state.user.address_line_two+" "+this.state.user.city+" "+this.state.user.state+" "+this.state.user.country+" "+this.state.user.zip_code).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              this.state.user.latitude=lat
              this.state.user.longitude=lng
              this.setState({
                  user: this.state.user,
                })
            },
            (error) => {
              console.error(error);
            }
          ).then(
            ()=>{
              fetch("http://localhost:9000/user/update/address", { method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(this.state.user)
                }).then(function(response) {
                  console.log(response)
                  return response.json();
                });
            }
          )

      }
      this.setState({
          editAddress: !this.state.editAddress
      })
  }

  handleInfoSave(){
      let changed = false
      if(this.state.user.farm_name != this.state.newFarmName){
        this.state.user.farm_name  = this.state.newFarmName
        changed = true
        this.setState({
            user: this.state.user,
          })
      }
      if(this.state.user.description != this.state.newDescription){
        changed = true
        this.state.user.description  = this.state.newDescription
        this.setState({
            user: this.state.user,
          })
      }
      if(changed){
        fetch("http://localhost:9000/user/update/producerInfo", { method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.user)
          }).then(function(response) {
            console.log(response)
            return response.json();
          });
      }
      this.setState({
          editInfo: !this.state.editInfo
      })


  }
  uploadHandler(event) {
    const data = new FormData();
  data.append('file', event.target.files[0]);

  axios.post('http://localhost:9000/postProduct/uploadImg', data)
    .then((res) => {
      this.state.user.profile_picture="http://localhost:9000/"+res.data.path.split("/")[1]
      this.setState({ user:this.state.user });
      fetch("http://localhost:9000/user/update/profilePicture", { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.user)
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
    });
  }
  componentDidMount(){
      fetch("http://localhost:9000/user?username="+this.props.user.username)
        .then(res => res.text())
        .then(res => this.setState({user: JSON.parse(res)}))
        .then(res => this.setState({newFarmName:this.state.user.farm_name,newDescription:this.state.user.description}))
        .then(res => this.setState({
                        newAddressLineOne: this.state.user.address_line_one,
                        newAddressLineTwo: this.state.user.address_line_two,
                        newCity: this.state.user.city,
                        newState: this.state.user.state,
                        newCountry: this.state.user.country,
                        newZipCode: this.state.user.zip_code,
                                    }))
        .catch(err => err);
  }
  render() {

    if(this.state.user==null) return <p>Login to see your profile</p>
    if(this.props.user.type=="PRODUCER"){
      return(

          <div className="product">
              <div className="profile-left">

                <div className=" product-info ">
                    <img className="product-image" src={this.state.user.profile_picture?this.state.user.profile_picture:profile}/>
                    <div>
                    <label htmlFor="filePicker" >
                        <p><span><img src={editIcon}/></span>Edit Profile Picture</p>
                    </label>
                    <input id="filePicker" style={{visibility:"hidden"}} type={"file"} onChange={this.uploadHandler}/>
                    </div>
                    <p className="product-title">{this.state.user.username}</p>
                    <p>{this.state.user.first_name}{" "}{this.state.user.last_name}</p>
                    <p>{this.state.user.email}</p>
                    <p>Date Joined: {this.state.user.date_joined.split("T")[0]}</p>

                </div>




              </div>
              <div className="profile-right ">

                 <div className="profile-tile produce4U-tile">
                   <p className="produce4U-greytext">What customers see on your profile:  </p>
                   <div className="profile-producerInfo">
                     <p> <span className="profile-lable produce4U-greentext">Your Farm Name:</span>
                     <span>{this.state.editInfo? <input maxlength="100" value={this.state.newFarmName} name="newFarmName" onChange={this.handleChange} /> : this.state.user.farm_name}</span>
                     </p>
                     <p className="profile-lable produce4U-greentext" > Your Description: </p>
                     {this.state.editInfo? <textarea maxlength="250" className="profile-description" value={this.state.newDescription} name="newDescription" onChange={this.handleChange}/> :<p className="profile-description "> {this.state.user.description} </p>}
                     {this.state.editInfo? <button className="profile-save-button" onClick={this.handleInfoSave}>save</button> : <img className="profile-edit" src={editIcon} onClick={()=>{this.setState({editInfo:!this.state.editInfo})}}/>}
                   </div>
                  </div>

                  <div className="profile-tile produce4U-tile">
                    <p className="produce4U-greytext">Your Address: </p>
                    <div className="profile-producerInfo">
                      <p> <span className="profile-lable produce4U-greentext">Address Line One:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newAddressLineOne} name="newAddressLineOne" onChange={this.handleChange} /> : this.state.user.address_line_one}</span>
                      </p>
                      <p> <span className="profile-lable produce4U-greentext">Address Line Two:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newAddressLineTwo} name="newAddressLineTwo" onChange={this.handleChange} /> : this.state.user.address_line_two}</span>
                      </p>
                      <p>
                      <span className="profile-address-lable produce4U-greentext">City:</span>
                      <span className="profile-address-span">{this.state.editAddress? <input maxlength="100" value={this.state.newCity} name="newCity" onChange={this.handleChange} /> : this.state.user.city}</span>
                      <span className="profile-address-lable produce4U-greentext">State:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newState} name="newState" onChange={this.handleChange} /> : this.state.user.state}</span>
                      </p>
                      <p>
                      <span className="profile-address-lable produce4U-greentext">Country:</span>
                      <span className="profile-address-span-country" >{this.state.editAddress? <input maxlength="100" value={this.state.newCountry} name="newCountry" onChange={this.handleChange} /> : this.state.user.country}</span>
                      <span className="profile-address-lable produce4U-greentext">Zip Code:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newZipCode} name="newZipCode" onChange={this.handleChange} /> : this.state.user.zip_code}</span>
                      </p>
                      {this.state.editAddress? <button className="profile-save-button" onClick={this.handleAddressSave}>save</button> : <img className="profile-edit" src={editIcon} onClick={()=>{this.setState({editAddress:!this.state.editAddress})}}/>}
                    </div>
                   </div>
              </div>
          </div>
      );
    }else{
      return(

          <div className="product">
              <div className="profile-left">

                <div className=" product-info ">
                    <img className="product-image" src={this.state.user.profile_picture?this.state.user.profile_picture:profile}/>
                    <div>
                    <label htmlFor="filePicker" >
                        <p><span><img src={editIcon}/></span>Edit Profile Picture</p>
                    </label>
                    <input id="filePicker" style={{visibility:"hidden"}} type={"file"} onChange={this.uploadHandler}/>
                    </div>
                    <p className="product-title">{this.state.user.username}</p>
                    <p>{this.state.user.first_name}{" "}{this.state.user.last_name}</p>
                    <p>{this.state.user.email}</p>
                    <p>Date Joined: {this.state.user.date_joined.split("T")[0]}</p>

                </div>




              </div>
              <div className="profile-right ">


                  <div className="profile-tile produce4U-tile">
                    <p className="produce4U-greytext">Your Address: </p>
                    <div className="profile-producerInfo">
                      <p> <span className="profile-lable produce4U-greentext">Address Line One:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newAddressLineOne} name="newAddressLineOne" onChange={this.handleChange} /> : this.state.user.address_line_one}</span>
                      </p>
                      <p> <span className="profile-lable produce4U-greentext">Address Line Two:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newAddressLineTwo} name="newAddressLineTwo" onChange={this.handleChange} /> : this.state.user.address_line_two}</span>
                      </p>
                      <p>
                      <span className="profile-address-lable produce4U-greentext">City:</span>
                      <span className="profile-address-span">{this.state.editAddress? <input maxlength="100" value={this.state.newCity} name="newCity" onChange={this.handleChange} /> : this.state.user.city}</span>
                      <span className="profile-address-lable produce4U-greentext">State:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newState} name="newState" onChange={this.handleChange} /> : this.state.user.state}</span>
                      </p>
                      <p>
                      <span className="profile-address-lable produce4U-greentext">Country:</span>
                      <span className="profile-address-span-country" >{this.state.editAddress? <input maxlength="100" value={this.state.newCountry} name="newCountry" onChange={this.handleChange} /> : this.state.user.country}</span>
                      <span className="profile-address-lable produce4U-greentext">Zip Code:</span>
                      <span>{this.state.editAddress? <input maxlength="100" value={this.state.newZipCode} name="newZipCode" onChange={this.handleChange} /> : this.state.user.zip_code}</span>
                      </p>
                      {this.state.editAddress? <button className="profile-save-button" onClick={this.handleAddressSave}>save</button> : <img className="profile-edit" src={editIcon} onClick={()=>{this.setState({editAddress:!this.state.editAddress})}}/>}
                    </div>
                   </div>
              </div>
          </div>
      );
    }

  }

}

export default ProfilePage;
