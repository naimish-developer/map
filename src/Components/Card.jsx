import React from 'react'

const Card = ({data}) => {
  return (
    <div class="card p-2" style={{ width: "20rem" }}>
      <img src={data.images &&data.images[0]} class="card-img-top images" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{data.title}</h5>
        <p class="card-text">data.description{data.description?.slice(0, 35)}</p>
      </div>
    </div>
  );
}

export default Card