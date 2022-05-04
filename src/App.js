import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import img1 from './images/fm1.jpg';
import img2 from './images/fm2.jpg';
import img3 from './images/fm3.jpg';
import img4 from './images/fm4.jpg';
import img5 from './images/fm5.jpg';
import img6 from './images/fm6.jpg';

function App() {
    const [imageList, setImageList] = useState({list: [img1,img2,img3,img4,img5,img6]});
    const [page, setPage] = useState(1);
    
    const loader = useRef(null);

    const handleScroll = (items) => {
      const target = items[0];
      if (target.isIntersecting) {   
          setPage((page) => page + 1)
      }
  }
  
    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };

         const user = new IntersectionObserver(handleScroll, options);
         if (loader.current) {
            user.observe(loader.current)
         }

    }, []);

    useEffect(() => {
      // Adding new images when user gets to the bottom of the page
        const newList = imageList.list.concat([img1,img2,img3,img4,img5,img6]);
        setImageList({
            list: newList
        })
    }, [page])

  return (
    <div>
      <Header />
      <div className="container">
        <div className="img-container">
        {
          imageList.list.map((post, index) => {
          return (
              <div key={index}>
              <img src={post} alt=""/>
              </div>)})
        }
        <div ref={loader}>
          <h3>Loading...</h3>
        </div>
       </div>
      </div>
    </div>
  );
}

export default App;
