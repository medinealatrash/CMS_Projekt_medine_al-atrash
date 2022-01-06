import React, { useState, useEffect } from 'react';


export default function PageBooks(props) {

  const selectedGenres = props.allGenres;

  const selectedGenre = props.myListObj.attributes.genres.data[0].attributes.Category;
  console.log(selectedGenre)
  let [showSelected, setShowSelected] = useState(false)
  let [booksInCategory, setBooksInCategory] = useState([]);

  function findBooksInGenre() {
    const genre = selectedGenres.find(item => item.attributes.Category === selectedGenre);
    return genre.attributes.books.data;
  }

  let [filmsInCategory, setFilmsInCategory] = useState([]);

  function findFilmsInGenre() {
    const genre = selectedGenres.find(item => item.attributes.Category === selectedGenre);
    return genre.attributes.films.data;
  }
  function handleshowSelected() {
    setShowSelected(!showSelected);
  }
  useEffect(() => {
    setBooksInCategory(findBooksInGenre());
    setFilmsInCategory(findFilmsInGenre());
  }, []);
  return (
    <div className='Page' >
      <p>Genre: <span className="genre" onClick={handleshowSelected} >{selectedGenre}</span> </p>
      {
        showSelected ?
          <>
            <h4 className="fontStyle">BOOKS</h4>
            {
              booksInCategory.map((item,i) => {
                return <p key={i} >{item.attributes.Title} <br /></p>;
              })
            }
            <h4 className="fontStyle">FILMS</h4>
            {
              filmsInCategory.map((item,i) => {
                return <p key={i} >{item.attributes.Title} <br /></p>;
              })
            }
          </>
          :

          <div >
            <h2> {props.myListObj.attributes.Title}  </h2>
            <h4>Author: {props.myListObj.attributes.Author} </h4>
            <p>Pages: {props.myListObj.attributes.Page}</p>
            <p>Rating: {props.myListObj.attributes.Ratings} / 10</p>

          </ div>
      }
    </div >
  )
}

