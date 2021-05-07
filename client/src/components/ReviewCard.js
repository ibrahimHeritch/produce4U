import React from 'react'


const divStyle = {
    margin: "auto",
    width: "500px",
    height: "300px",
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
            <p className="product-title">{props.review.author_name}</p>
            <p>Stars: {props.review.rating}</p>
        ``` <p className: "produce4U-reviewText">{props.review.text}</p>
            <p className: "produce4U-producerReviewHeader">Producer Reply:<span className:"produce4U-reviewText"></span>{props.review.producer_reply}</p>
        </div>
    )
}

export default ReviewCard
