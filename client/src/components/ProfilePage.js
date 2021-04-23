import React, {Component,useState} from 'react';
import '../styles/profile.css';
import editIcon from '../resources/Icons/edit.svg'
import profile from '../resources/pictures/defualt_profile.png'

class ProfilePage extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      user:null,
      temp:"hello",
      editInfo: false,
      newFarmName: "",
      newDescription: ""
    }
    this.handleInfoSave = this.handleInfoSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }
///TODO make this update the backend
  handleInfoSave(){
      if(this.state.user.username != this.state.newFarmName){
        this.state.user.username  = this.state.newFarmName
        this.setState({
            user: this.state.user,
            editInfo: !this.state.editInfo
          })
      }

  }

  componentDidMount(){
      fetch("http://localhost:9000/user?username="+this.props.user.username)
        .then(res => res.text())
        .then(res => this.setState({user: JSON.parse(res)}))
        .catch(err => err);
  }
  render() {
    if(this.state.user==null) return <p>Login to see your profile</p>

    return(

        <div className="product">
            <div className="profile-left">

              <div className=" product-info ">
                  <img className="product-image" src={profile}/>
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
                  <span>{this.state.editInfo? <input value={this.state.newFarmName} name="newFarmName" onChange={this.handleChange} /> : this.state.user.username}</span>
                  </p>
                  <p className="profile-lable produce4U-greentext" > Your Description: </p>
                  {this.state.editInfo? <textarea className="profile-description" value={this.state.newDescription} name="newDescription" onChange={this.handleChange}/> :<p className="profile-description "> {this.state.user.description} </p>}
                  {this.state.editInfo? <button className="profile-save-button" onClick={this.handleInfoSave}>save</button> : <img className="profile-edit" src={editIcon} onClick={()=>{this.setState({editInfo:!this.state.editInfo})}}/>}
                </div>
               </div>
               <div className="profile-tile produce4U-tile">
                 <p className="produce4U-greytext">Your Address:</p>
                 <Editable value={"TODO"} onChange={(event)=>{this.setState({temp:event.target.value})}}/>
                </div>
            </div>
        </div>
    );
  }

}

export default ProfilePage;
