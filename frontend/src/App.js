import React, { useState, useEffect } from 'react';
import Films from './Films';
import Books from './Books';





export default function AppB() {

  const [showBook, setShowBook] = useState(false);
  const [showFilm, setShowFilm] = useState(false);

  const [takeGenre, setTakeGenre] = useState(false);

  function handleshowBook() {
    setShowBook(true);
  }
  function handleshowFilm() {
    setShowFilm(true);
  }
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/genres?populate=*");
        const newData = await response.json();
        setGenres(newData.data);
      }
      catch (errorM) {
        document.getElementById('msg').style.display = 'block';
      }
    };
    fetchData()
  }, [])
  const [categoryBook, setInCategoryBook] = useState([]);
  const [categoryFilm, setInCategoryFilm] = useState([]);
  let [titleGenre, setTitleGenre] = useState('');
  function showYourGenres(event) {
    setTakeGenre(true);
    setTitleGenre(event.target.textContent);
    setInCategoryBook(findInGenreBook(event.target.textContent));
    setInCategoryFilm(findInGenreFilm(event.target.textContent));
  }
  function findInGenreBook(yourGenre) {
    const genreN = genres.find(item => item.attributes.Category === yourGenre);
    return genreN.attributes.books.data;
  }
  function findInGenreFilm(yourGenre) {
    const genreN = genres.find(item => item.attributes.Category === yourGenre);
    return genreN.attributes.films.data;
  }
  function comeBackHandler() {
    setTakeGenre(!takeGenre);
  }

  return (
    <div className="App">
      <div className="left">
        <button onClick={handleshowBook} style={{ marginTop: '5rem' }}>Books<i className="fas fa-book"></i></button>
        <button onClick={handleshowFilm}>Films<i className="fas fa-film"></i></button>
        <div className="dropdown">
          <button className="dropbtn">Genres <i className="fas fa-theater-masks"></i></button>
          <div className="dropdown-content">
            {genres.map((genre, i) => {
              return (<p className="genres" key={i} onClick={showYourGenres}>
                {genre.attributes.Category}
              </p>)
            })}
          </div>
        </div>
        <img src="fb.png" />
      </div>
      <div className="right">
        {takeGenre ?
          <div >
            <div className="top">
              <h1 className="darkBlue">GENRE: {titleGenre} <i className="fas fa-theater-masks"></i></h1>
              <button className="btn x" onClick={comeBackHandler}>X</button>
            </div>
            <div className="genres">
              {
                categoryBook.map((c, i) => {
                  return (
                    <div key={i} className='Page'>
                      <h2> {c.attributes.Title} </h2>
                      <h4>Author: {c.attributes.Author} </h4>
                      <h4>TYPE: Book <i className="fas fa-book"></i></h4>
                      <p>Pages: {c.attributes.Page}</p>
                      <p>Rating: {c.attributes.Ratings} /10</p>
                    </div>)
                })
              }
              {
                categoryFilm.map((c, i) => {
                  return (
                    <div key={i} className='Page'>
                      <h2> {c.attributes.Title}  </h2>
                      <h4 >Release: {c.attributes.Release} </h4>
                      <h4>TYPE: Film <i className="fas fa-film"></i></h4>
                      <p>Length: {c.attributes.Length}</p>
                      <p>Rating: {c.attributes.Rating} /10</p>
                    </div>)
                })
              }
            </div>
          </div>
          : false
        }
        {
          showBook ?
            <Books allGenres={genres} setShowBook={setShowBook} />
            : false
        }
        {
          showFilm ?
            <Films allGenres={genres} setShowFilm={setShowFilm} />
            : false
        }
      </div>
    </div >
  );
}


