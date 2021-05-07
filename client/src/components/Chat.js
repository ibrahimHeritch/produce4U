import React, { Component } from "react";
import socket from "../chatService.js";
import '../styles/chat.css';
import profile from '../resources/pictures/defualt_profile.png'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [

      ],
      messages: [],
      newMessage: {
        from_user: this.props.user.username,
        to_user: null,
        message: "",
        picture: null,
        send_datetime:null
      },
      current_to_user:props.match.params.user,
      newMessageValue:""
    };
    this.send = this.send.bind(this)
    this.block = this.block.bind(this)
  }


  send(){
    let currentTime = new Date()
    this.state.newMessage.message=this.state.newMessageValue
    this.state.newMessage.send_datetime=currentTime.toISOString()
    this.state.newMessage.nice_send_datetime=currentTime.toLocaleString([],{day: '2-digit',month:'2-digit',year: '2-digit',hour: '2-digit', minute:'2-digit'})
    this.state.newMessage.to_user=this.state.current_to_user
    socket.emit('new message', this.state.newMessage)
    this.state.messages=[{...this.state.newMessage},...this.state.messages]
    this.state.newMessageValue=""
    this.setState({newMessage:this.state.newMessage,
                  newMessageValue:this.state.newMessageValue,
                  messages:this.state.messages})
  }

  addChat(user){
    fetch("http://localhost:9000/chat/new", { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user1:this.props.user.username,user2:user})
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
  }

  getChats(){
    return this.state.chats.map(item =>{return <div className="chat-item" onClick={()=>{this.setState({current_to_user:item.username},this.toUserChanged)}}>
    <img className="chat-profile-img" src={item.profile_picture == null? profile:item.profile_picture}/>

                                            <p>
                                                  {item.username}

                                            </p>
                                            {item.unread_messages != 0 && <div className="chat-unread-messages">{item.unread_messages}</div>}
                                            </div>})
  }

  getMessages(){

    return this.state.messages.map(item =>{ if(item.from_user != this.props.user.username){
                                              return <div className="chat-message-item-outgoing">
                                                      <div className="chat-message-bubble-outgoing">
                                                        <div className="chat-message-text"><span>{item.message}</span></div>
                                                        <div className="chat-message-time">{item.nice_send_datetime}</div>
                                                      </div>
                                                  </div>
                                            }else{
                                              return <div className="chat-message-item-incoming">
                                                          <div className="chat-message-bubble-incoming">
                                                            <div className="chat-message-text"><span>{item.message}</span></div>
                                                            <div className="chat-message-time">{item.nice_send_datetime}</div>
                                                          </div>
                                                      </div>
                                            }
                    })
  }


  componentDidMount(){
      fetch("http://localhost:9000/chat?user="+this.props.user.username)
        .then(res => res.text())
        .then(res => this.setState({chats: JSON.parse(res).result}))
        .catch(err => err);
       fetch("http://localhost:9000/chat/messages?user1="+this.props.user.username+"&user2="+this.state.current_to_user)
          .then(res => res.text())
          .then(res => this.setState({messages: JSON.parse(res).result}))
          .catch(err => err);
  }

  toUserChanged(){
    fetch("http://localhost:9000/chat?user="+this.props.user.username)
      .then(res => res.text())
      .then(res => this.setState({chats: JSON.parse(res).result}))
      .then(res =>{
        this.state.chats = this.state.chats.map((item)=>{
             if(item.username == this.state.current_to_user){
                 item.unread_messages=0
               }
             return item
         })
        this.setState({chats:this.state.chats})
        }
      )
      .catch(err => err);
     fetch("http://localhost:9000/chat/messages?user1="+this.props.user.username+"&user2="+this.state.current_to_user)
        .then(res => res.text())
        .then(res => this.setState({messages: JSON.parse(res).result}))
        .catch(err => err);

  }

  block(){
    this.state.chats=this.state.chats.filter(item => item.username != this.state.current_to_user)
    this.state.current_to_user = "ALL"
    this.state.messages = []
    this.setState({chats:this.state.chats,current_to_user:this.state.current_to_user,messages:this.state.messages})
  }

  componentDidUpdate(){

    socket.removeAllListeners();
    socket.once('message:'+this.props.user.username, (message) => {
        if(message.from_user == this.state.current_to_user){
          this.state.messages=[message,...this.state.messages]

          this.setState({messages:this.state.messages})
        }else{
          this.state.chats = this.state.chats.map((item)=>{
                if(item.username == message.from_user){
                  item.unread_messages++
                }
                return item
          })
          this.setState({chats:this.state.chats})
        }
    })
    socket.once('New Chat:'+this.props.user.username, (message) => {
      this.toUserChanged()
    })
  }

  render() {
    if(this.state.current_to_user!="ALL"){
      this.addChat(this.state.current_to_user)
    }

    return (
      <div style={{padding:"50px", textAlign: "center" }}>
          <div className="chat-tile">
            <div className="chat-side">

              <header className="chat-header">
                <p className="produce4U-greentext">My Chats</p>
              </header>
              <div className="chat-list">
                {this.getChats()}
              </div>

            </div>

            <div className="chat-main">
            <div className="chat-message">
              <div className="chat-name"><p className="produce4U-greentext">{this.state.current_to_user}</p></div>
              <button className="chat-block-button" onClick={this.block}>Block</button>
            </div>
              <div className="chat-messages">
              {this.getMessages()}
              </div>
              <div className="chat-message">
                <textarea maxlength="250" className="chat-textarea" value={this.state.newMessageValue} onChange={(event)=>{this.setState({newMessageValue:event.target.value})}}/>
                <button className="chat-send" onClick={this.send} >Send</button>
              </div>
            </div>
          </div>

      </div>
    )
  }
}

export default Chat
