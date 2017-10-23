import React from 'react';

const RunSingle = props => {
  return (
      <div className="thumbnail">
          {props.renderMap(props.rundata)}
      <div className="caption">
          <h3 className="main-color-bg rundate">{`${moment(props.created).format('MMM D, Y')}`}</h3>
          <p>{props.miles} miles</p>
          <p>Your run was from {props.start} to {props.end}.</p>
          <a href="" className="btn main-color-bg" role="button">View this Run!</a>
      </div>
      </div>
  )
}

export default RunSingle;