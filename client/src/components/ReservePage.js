import React, {Component} from 'react';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import '../styles/reservation.css';
import ScrollableProduce from '../components/ScrollableProduce'



class ReservePage extends Component{

  constructor(props){
    super(props);
    this.state = {times: ["8:00 AM","8:15 AM","8:30 AM","8:45 AM","9:30 AM","9:00 AM","9:15 AM","9:30 AM","9:45 AM","10:00 AM","2:00 PM","2:15 PM","2:30 PM","2:45 PM","3:15 PM","4:00 PM"],
                  pickupDate:null,
                  selectedTime: 0,
                  selectedProducts: [],
                  error: [false, false],
                  errorText: "ALL OK",
                  getError: "ALL OK",
                  user: JSON.parse(localStorage.getItem('user'))
                }
    this.confirmReservation = this.confirmReservation.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  getTimes(){
    return this.state.times.map((item,index) => { return <a onClick={() => this.setState({selectedTime:index})}>
                                                               {index == this.state.selectedTime?
                                                                  <p className="time_active"> {item} </p>
                                                                : <p className="time_inactive"> {item} </p>
                                                           }</a>;});
  }



  getFormLabels(){
    if(this.state.selectedProducts.length == 0){
      return <div className="quantity-form-item"><p> Opps seems like you have not selected any products </p></div>
    }
    return this.state.selectedProducts.map(
          (item,index) =>{
            return <label className="quantity-form-item">
                      <button type="button" className = "cancel-product-button"
                        onClick = {()=>{
                          this.state.selectedProducts.splice(index,1);
                          this.state.error.splice(index,1);
                          this.setState({
                            selectedProducts:this.state.selectedProducts,
                            error:this.state.error,
                          })}
                        }
                      > X </button>
                      <p className="reservation-product-name"> {item.name}: </p>
                      <input className={this.state.error[index]? "quantity-form-input input-error":"quantity-form-input"} type="text" onChange=
                        {(event)=>{
                            var value = parseInt(event.target.value);
                            if(!isNaN(value) && value>0 && value <= item.quantity){
                              this.state.selectedProducts[index].order_quantity = value;
                              this.state.error[index] = false;
                              if(this.state.errorText == "Invalid Input for "+item.name ||"Only "+item.quantity+" "+item.pricing_type+" of "+item.name+" Left."){
                                this.state.errorText = "ALL OK"
                              }
                              this.setState({
                                selectedProducts:this.state.selectedProducts,
                                error:this.state.error,
                              })

                            }else{
                              this.state.selectedProducts[index].order_quantity = 0;
                              this.state.error[index] = true;

                              if(value > item.quantity){
                                this.state.errorText = "Only "+item.quantity+" "+item.pricing_type+" of "+item.name+" Left."
                              }else {
                                this.state.errorText = "Invalid Input for "+item.name;
                              }
                              this.setState({
                                selectedProducts:this.state.selectedProducts,
                                error:this.state.error,
                                errorText:this.state.errorText
                              })
                            }

                          }
                        }
                      />
                      <p> {item.pricing_type} x ${item.price.toFixed(2)} </p>
                   </label>
          }
    );
  }

  confirmReservation(event){
    if(this.state.errorText == "ALL OK"){
      this.state.selectedProducts.forEach((item, i) => {
        item.total = item.order_quantity * item.price
        item.date = this.state.pickupDate +' '+this.state.times[this.state.selectedTime]
        item.user = this.state.user.username
        if(item.total > 0 && this.state.pickupDate != null){
          fetch("http://localhost:9000/reservation", { method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
            }).then(function(response) {
              console.log(response)
              return response.json();
            });
        }else{
          if(this.state.pickupDate == null){
            this.state.errorText = "Please Selected Pick up Date and Time"
            this.setState({errorText:this.state.errorText})
          }
          event.preventDefault()
        }
      });
    }else{
      event.preventDefault()
    }
  }

  handleDateChange(mnt){
      this.setState({pickupDate : mnt.toISOString().split('T').shift()})


  }

  componentDidMount(){

        fetch("http://localhost:9000/postProduct/"+this.props.match.params.id)
          .then(res => res.text())
          .then(res => this.setState({getError:JSON.parse(res).error,selectedProducts: [JSON.parse(res).result]}))
          .catch(err => err);
  }


  addProduct(product){
    if(!this.state.selectedProducts.includes(product)){
      this.state.selectedProducts.push(product)
      this.setState({selectedProducts:this.state.selectedProducts})
    }

  }
  render() {
    if(this.props.user.type != "USER"){
      return <p>You need to Login with Customer account to reserve products</p>
    }
    if(this.state.selectedProducts.length==0){
      return <p>Loading....</p>
    }
    if(this.state.getError!="ALL OK"){
      return <p style={{color:'red'}}>{this.state.error}</p>
    }

    var yesterday = moment().subtract( 1, 'day' );
    var valid = function( current ){
      return current.isAfter( yesterday ) && current.day() !== 0 && current.day() !== 6;
    };

    var total = this.state.selectedProducts.length == 0? NaN:this.state.selectedProducts.reduce((a,b)=>a+(b.order_quantity * b.price),0).toFixed(2);
    if(!this.state.user && this.state.user.type != "USER"){
      return <p>You need to log into a customer account to view this page</p>
    }
    return(
        <div className="reserve">
          <div className=" reservation-step ">

                <p>
                <span>Choose a convenient time to pick-up your</span>
                 <span className="reservation-product"> {" "+this.state.selectedProducts[0].name+" "}</span>
                 <span>:</span>
                </p>
                <div className="reservation-datetime">
                  <div>
                    <p>Date:</p>
                    <Datetime input={false} timeFormat={false} isValidDate={ valid } onChange={this.handleDateChange}/>
                  </div>
                  <div width="50%">
                    <p>Time:</p>
                    <div className="available-times">
                      {this.getTimes()}
                    </div>
                  </div>
                </div>
          </div>

          <div className=" reservation-step ">
                <p>
                  <span>Since you're already going, why not reserve some other products by</span>
                  <span className="reservation-product">{" "+this.state.selectedProducts[0].owner_username+" "}</span>
                  <span>:</span>
                </p>
                <ScrollableProduce username={this.state.selectedProducts[0].owner_username} onAdd={this.addProduct} exclude={this.state.selectedProducts[0]}/>
          </div>

          <div className=" reservation-step ">
                <p>
                  How much do you need?
                </p>
                <form className="quantity-form">
                   {this.getFormLabels()}
                </form>
                <div className="quantity-line"></div>
                <label className="quantity-form-item">
                          <p className="reservation-product-name"> Total: </p>
                          <p> ${ isNaN(total)? "0.00" : total} </p>
                          <p style={{color:"white"}}> Oz x $3.50 </p>
                </label>
          </div>
          <a onClick={this.confirmReservation} href="/Confirmation" >
             <button className="produce4U-green-button">
                Confirm Pick up
             </button>
          </a>
          {this.state.errorText!="ALL OK" && <p style={{color:"red"}}>{this.state.errorText}</p>}
        </div>
    );
  }

}

export default ReservePage;
