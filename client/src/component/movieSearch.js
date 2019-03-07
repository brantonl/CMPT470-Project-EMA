import React, { Component } from "react";
import { Input } from "antd";
import 'antd/dist/antd.css';

const Search = Input.Search;

class MovieSearch extends Component{
    render(){
        return(
            <div>
                <Search
                    placeholder="Search movies by title, leave empty and press enter to obtain full list"
                    onSearch={this.props.onSearch}
                    style={{width:500}}
                />
            </div>
        )
    }
}

export default MovieSearch;