import React from 'react'

const divStyle = {
  margin: "auto",
  width: "300px",
  height: "460px",
  margin: "50px",
  color:"#78B244",
  padding:"20px"
}
function ProduceCard(props){
  console.log(props)
  return (
    <div className="produce4U-tile" style={divStyle}>
    <br />
    <a href="/product"><img src={props.product.imageSrc} className="produce4U-roundImage"/></a>
    <p className="product-title">{props.product.name}</p>
    <div className="quantity-form-item">
      <p>${props.product.price.toFixed(2)}{" "}{props.product.pricingType} </p>
      <p>{props.product.distance} miles away</p>
    </div>
    <p>Stars: {props.product.stars}</p>
    <p className="produce4U-producer product-producer">{props.product.producer}</p>
    </div>
  )
}

export default ProduceCard
