import React, { useState, useEffect } from 'react';
import PageFilms from './PageFilms';


export default function Films(props) {

    const [myFilms, setMyFilms] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:1337/api/films?populate=*");
          const newData = await response.json();
          setMyFilms(newData.data);
        }
        catch (errorM) {
          document.getElementById('msg').style.display = 'block';
        }
      };
      fetchData()
    }, [])

    function comeBackHandler3() {
        props.setShowFilm(false);
       }
    return (
        <div>
            <>
            <div className="top">
<h1 className="darkBlue">All Films <i className="fas fa-film"></i></h1>
<button className="btn x" onClick={ comeBackHandler3}>X</button>
</div>
<div className="all" >
  {myFilms.map((filmsItem, i) => {
    return (<PageFilms  myListObj={filmsItem} key={i} allGenres={props.allGenres} />)

  })}
  </div>
</>
        </div>
    )
}
