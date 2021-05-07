import React, { useState } from 'react'
import "../styles/review.css"
import ReviewCard from "../components/ReviewCard"


function ScrollReviews(props){
    const [review, updateReview] = useState(0);

    if(!review){
        fetch("http://localhost:9000/review/"+props.fetch_by+(props.fetch_by=="product"?"?product="+props.product_id : "?producer="+props.producer))
            .then(res => res.text())
            .then(res => updateReview(JSON.parse(res).result))
            .catch(err => err)
        return(<p>Loading...</p>)
    }
    if(review.length == 0 || (props.exclude && review.length == 1)){
        return(<p>Hmmm, It seems this producer has no {props.exclude && "other"} reviews at this time.</p>)
    }
    return (
        <div className="produce-horizontal-scrollmenu">
            {review.map(item => {
                return <p>{item.text}</p>
            })
            }
        </div>
    )
}

export default ScrollReviews
