import React from 'react'

const divStyle = {
  margin: "auto",
  width: "300px",
  height: "460px",
  float: "left",
  margin: "50px",
  color:"#78B244",
  padding:"20px"
}

const image = {
  borderRadius: "60%",
  height: "auto",
  width: "auto",
  maxWidth: "150px",
  maxHeight: "150px"
}
function ProduceCard(props){
  console.log(props)
  return (
    <div className="produce4U-tile" style={divStyle}>
    <br />
    <img src={props.product.imageSrc} style={image}/>
    <p>{props.product.name}</p>
    <p>${props.product.price} {props.product.pricingType} </p>
    <p>{props.product.distance} miles away</p>
    <p>{props.product.stars}</p>
    <p>{props.product.producer}</p>
    </div>
  )
}

export default ProduceCard
