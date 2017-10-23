import React from 'react';
import { Link } from 'react-router-dom';

const Run = props => {
  return (
      <div className="thumbnail">
          {props.renderMap(props.rundata)}
        <div className="caption">
            <h3 className="main-color-bg rundate">{`${moment(props.created).format('MMM D, Y')}`}</h3>
            <p>{props.miles} miles</p>
            <p>Your run was from {props.start} to {props.end}.</p>
            <Link to={`/run/${props.id}`}>View this Run!</Link>
        </div>
      </div>
  )
}

export default Run;