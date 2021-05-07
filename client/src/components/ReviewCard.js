import React from 'react'
import '../styles/review.css'

const divStyle = {
    margin: "auto",
    width: "300px",
    height: "460px",
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

function ReviewCard(props){
    return (

    <div className="produce4U-tile" style={divStyle}>
        <br />
        <a href={"/review/"+props.review.id}><img src={props.review.picture} className="produce4U-roundImage"/></a>
        <p className="product-title">{props.review.author_username}</p>
        <p>Stars: {props.review.rating}</p>
        <p>Comments: {props.review.text}</p>
    </div>
)
}


export default ReviewCard
