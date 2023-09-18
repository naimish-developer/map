import React, { useState } from 'react'
import Card from '../../Components/Card'
import { useEffect } from 'react'
const Pagination = () => {
const [ProductsData, setProductsData] = useState([])
const [Productlength, setProductlength] = useState(0);
  const [Page, setPage] = useState(1);

const pagehendler = (page) => {
  if (page === "previous") {
    if (Page > 0) setPage((pre) => pre - 1);
    else setPage(1);
  } else if (page === "next") {
    if (Page < Productlength / 6) setPage((pre) => pre + 1);
    else setPage(Productlength / 6);
  } else {
    setPage(page);
  }
};

const fetchdatalength= async()=>{

    const responce = await fetch("https://dummyjson.com/products");
    const data= await responce.json()
 if(data && data.products) setProductlength(data.products.length);
}
const fetchdata= async()=>{
    setProductsData([])
    const responce = await fetch(
      `https://dummyjson.com/products?limit=${6}&skip=${Page * 6 - 6}&`
    );
        const data= await responce.json()
        if(data && data.products) setProductsData(data.products);
       
}
console.log(ProductsData);
useEffect(() => {
    fetchdatalength();
}, []);

useEffect(() => {
  fetchdata();
}, [Page]);

// console.log(ProductsData);

  return (
    <div className="Screen">
      <div className="my-3 d-flex gap-3 flex-wrap justify-content-center justify-content-md-between">
        {ProductsData.length > 0 ? (
          ProductsData.map((value, index) => {
            return <Card data={value} key={index}></Card>;
          })
        ) : (
          <div> Data Not Found</div>
        )}
      </div>
      <div className="mx-auto my-3" style={{ width: "18rem" }}>
        <nav aria-label="Page navigation example ">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <span class="page-link" aria-label="Previous" onClick={()=>pagehendler("previous")}>
                <span aria-hidden="true">&laquo;</span>
              </span>
            </li>
            {Productlength > 0 ? (
              [...Array(Productlength / 6)].map((_, index) => {
                return (
                  <li
                    key={index + 1}
                    className={
                      Page === index + 1 ? "page-item active" : "page-item"
                    }
                    onClick={() => pagehendler(index + 1)}
                  >
                    <span className="page-link">{index + 1}</span>
                  </li>
                );
              })
            ) : (
              <li className="page-item">
                <span className="page-link active">0</span>
              </li>
            )}

            <li className="page-item">
              <span class="page-link" aria-label="Previous" onClick={()=>{pagehendler("next")}}>
                <span aria-hidden="true">&raquo;</span>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination