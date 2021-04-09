import React, {Component} from 'react';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';



class ReservePage extends Component{

  constructor(props){
    super(props);
    this.state = {times: ["8:00 AM","8:15 AM","9:30 AM","9:45 AM","2:00 PM","2:15 PM","2:30 PM","2:45 PM","3:15 PM","4:00 PM"],
                  selectedTime: -1,
                  selectedProducts: [{name: "Fresh Organic Strawberries", price: 3.50, quantity: 0},{name: "Hybrid Corn", price: 2.60, quamtity:0}],
                  error: [false,false],
                  };
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
                            selectedQuantities:this.state.selectedQuantities,
                            error:this.state.error,
                          })}
                        }
                      > X </button>
                      <p className="reservation-product-name"> {item.name}: </p>
                      <input className={this.state.error[index]? "quantity-form-input input-error":"quantity-form-input"} type="text" onChange=
                        {(event)=>{
                            var value = parseInt(event.target.value);
                            if(!isNaN(value) && value>0 ){
                              this.state.selectedProducts[index].quantity = value;
                              this.state.error[index] = false;
                              this.setState({
                                selectedQuantities:this.state.selectedQuantities,
                                error:this.state.error,
                              })

                            }else{
                              this.state.selectedProducts[index].quantity = 0;
                              this.state.error[index] = true;
                              this.setState({
                                selectedQuantities:this.state.selectedQuantities,
                                error:this.state.error,
                              })
                            }

                          }
                        }
                      />
                      <p> Oz x ${item.price.toFixed(2)} </p>
                   </label>
          }
    );
  }

  render() {
    var yesterday = moment().subtract( 1, 'day' );
    var valid = function( current ){
      return current.isAfter( yesterday ) && current.day() !== 0 && current.day() !== 6;
    };

    var total = this.state.selectedProducts.reduce((a,b)=>a+(b.quantity * b.price),0).toFixed(2);

    return(
        <div className="reserve">
          <div className=" reservation-step ">
                <p>
                <span>Choose a convenient time to pick-up your</span>
                 <span className="reservation-product"> Fresh Organic Strawberries</span>
                 <span>:</span>
                </p>
                <div className="reservation-datetime">
                  <div>
                    <p>Date:</p>
                    <Datetime input={false} timeFormat={false} isValidDate={ valid }/>
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
                  <span className="reservation-product"> Perdu Farms</span>
                  <span>:</span>
                </p>
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
          <a href="/confirmation">
             <button className="produce-button">
                Confirm Pick up
             </button>
          </a>

        </div>
    );
  }

}

export default ReservePage;
