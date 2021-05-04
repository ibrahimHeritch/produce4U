import React, { useState } from 'react'
import ProduceCard from '../components/ProduceCard'


function ScrollableProduce(props){
  const [produce, updateProduce] = useState(0);

  if(!produce){
    fetch("http://localhost:9000/postProduct?user="+props.username)
          .then(res => res.text())
          .then(res => updateProduce(JSON.parse(res).result))
          .catch(err => err)
    return(<p>Loading...</p>)
  }
  if(produce.length == 0 || (props.exclude && produce.length == 1)){
    return(<p>Hmmm, It seems producer has no {props.exclude && "other"} products at this time.</p>)
  }
  return (
    <div className="produce-horizontal-scrollmenu">
      {produce.map(item => {
            if(!props.exclude || (props.exclude && props.exclude.id != item.id))
                return <div className="produce-horizontal-scrollmenu-card">
                        <ProduceCard product = {item} onAdd={props.onAdd} />
                      </div>
                })
      }
    </div>
  )
}

export default ScrollableProduce
