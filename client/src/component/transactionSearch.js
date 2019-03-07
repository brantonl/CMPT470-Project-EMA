import React, { Component } from "react";
import { Input } from 'antd';
import 'antd/dist/antd.css';

const Search = Input.Search;

class TransactionSearch extends Component {

    render() {

        return (

            <div>

                 <Search
                    placeholder="Search transactions"
                    onSearch={this.props.onSearch}
                    style={{ width: 200 }}
                 />
                
            </div>

        );

    }


}

export default TransactionSearch;
