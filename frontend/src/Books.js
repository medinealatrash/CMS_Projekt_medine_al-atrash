
import React, { useState, useEffect } from 'react';

import PageBooks from './PageBooks';

export default function Books(props) {


    const [myList, setMyList] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:1337/api/books?populate=*");
          const newData = await response.json();
          setMyList(newData.data);
        }
        catch (errorM) {
          document.getElementById('msg').style.display = 'block';
        }
      };
      fetchData()
    }, [])

    function comeBackHandler2() {
        props.setShowBook(false);;
       }
    return (
        <div >
             <>
             <div className="top">
               <h1 className="darkBlue">All books <i className="fas fa-book"></i>  </h1>
               <button className="btn x" onClick={ comeBackHandler2}>X</button>
               </div>
             <div className="all" >
             
              {myList.map((listItem, i) => {
                return (
                    
                <PageBooks myListObj={listItem} key={i} allGenres={props.allGenres} />)
              })}
              </div>
            </>
        </div>
    )
}
