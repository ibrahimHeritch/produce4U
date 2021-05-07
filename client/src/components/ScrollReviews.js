import React, { useState } from 'react'
import "../styles/review.css"
import ReviewCard from "../components/ReviewCard"


function ScrollReviews(props){
    const [review, updateReview] = useState(0);

    if(!review){
        fetch("http://localhost:9000/review/"+props.fetch_by+"?product"+props.product_id)
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
                if(!props.exclude || (props.exclude && props.exclude.id != item.id))
                    return <div className="produce-horizontal-scrollmenu-card">
                        <ReviewCard product = {item} onAdd={props.onAdd} />
                    </div>
            })
            }
        </div>
    )
}

export default ScrollReviews
