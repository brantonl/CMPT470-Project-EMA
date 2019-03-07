import React, { Component } from "react";
import MovieList from "../component/movieList";

class Movie extends Component{
    render() {
    
        return (
          <div> 
            <div> <MovieList /> </div>
          </div>
        );
      }
}

export default Movie;