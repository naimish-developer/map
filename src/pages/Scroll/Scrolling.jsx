import React, { useEffect, useState } from 'react'
import Card from "../../Components/Card";

const Scrolling = () => {
  
  const [ProductsData, setProductsData] = useState([]);
  const [Page, setPage] = useState(1);
  const [loading, setloading] = useState(true);
  
  const scrollhendler=()=>{
    console.log("Full Hight with scroll" +  "=> " + document.documentElement.scrollHeight)
    console.log("current Hight od screen" +  "=> " + window.innerHeight)
    console.log(" How much scroll " +  "=> " + document.documentElement.scrollTop)

    if (
      window.innerHeight + (document.documentElement.scrollTop  + 10 ) >
      document.documentElement.scrollHeight
    ) {
      setPage((pre)=>pre+1)
    }
  }
  
  const fetchdata = async () => {
    setloading(true)
    const responce = await fetch(`https://dummyjson.com/products?limit=${Page*6}`);
    const data = await responce.json();
    if (data && data.products) setProductsData((...pre)=> [...pre,...data.products]);
    setloading(false)
  };

  useEffect(() => {
    fetchdata();
  }, [Page]);
  useEffect(() => {
window.addEventListener("scroll",scrollhendler) 
return () => window.removeEventListener("scroll", scrollhendler);
}, []);


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
        {loading && <div className='d-block w-100 mx-3'>loading....</div>}
      </div>
    </div>
  );
}

export default Scrolling