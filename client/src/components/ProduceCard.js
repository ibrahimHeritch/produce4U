import React from 'react'
const image = {
  borderRadius: "60%",
  height: "auto",
  width: "auto",
  maxWidth: "150px",
  maxHeight: "150px"
}
const divStyle = {
  margin: "auto",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "gray",
  borderRadius: "25px",
  width: "300px",
  height: "360px",
  float: "left",
  margin: "50px"
}
function ProduceCard(props){
  console.log(props)
  return (
    <div style = {divStyle}>
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
