import React, { useState, useEffect } from 'react';


export default function PageFilms(props) {

  const selectedGenres = props.allGenres;
  const selectedGenre = props.myListObj.attributes.genres.data[0].attributes.Category;

  let [showSelected, setShowSelected] = useState(false)
  let [filmsInCategory, setFilmsInCategory] = useState([]);

  function findFilmsInGenre() {
    const genre = selectedGenres.find(item => item.attributes.Category === selectedGenre);
    return genre.attributes.films.data;
  }
  let [booksInCategory, setBooksInCategory] = useState([]);

  function findBooksInGenre() {
    const genre = selectedGenres.find(item => item.attributes.Category === selectedGenre);
    return genre.attributes.books.data;
  }
  function handleshowSelected() {
    setShowSelected(!showSelected);
  }
  useEffect(() => {
    setFilmsInCategory(findFilmsInGenre());
    setBooksInCategory(findBooksInGenre());
  }, []);
  return (
    <div className='Page' >

<p>Genre: <span className="genre" onClick={handleshowSelected} >{selectedGenre}</span> </p>
     
      {
        showSelected ?
          <>
            <h4 className="fontStyle">FILMS</h4>
            {
              filmsInCategory.map((item,i) => {
                return <p key={i} >{item.attributes.Title} <br /></p>;
              })
            }
            <h4 className="fontStyle">BOOKS</h4>
            {
              booksInCategory.map((item,i)=> {
                return <p key={i} >{item.attributes.Title} <br /></p>;
              })
            }
          </>
          :
          <div >
            <h2> {props.myListObj.attributes.Title}  </h2>
            <h4>Release: {props.myListObj.attributes.Release} </h4>
            <p>Length: {props.myListObj.attributes.Length}</p>
            <p>Rating: {props.myListObj.attributes.Rating} /10</p>
          </ div>
      }
    </div >
  );
}
