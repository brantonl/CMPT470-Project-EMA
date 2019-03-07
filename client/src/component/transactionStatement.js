import React, { Component } from "react";
import { Button, Icon, Input, Card, Table, Tag, Spin } from 'antd';
import TransactionModal from './transactionModal';
import TransactionSearch from './transactionSearch';
import 'antd/dist/antd.css';
import storage from '../utils/Storage';
import config from '../config.js';
import axios from 'axios';
import moment from "moment";

class TransactionStatement extends Component {

    constructor(props) {
      super(props);
      this.state = {
        transactions: [],
        token: false,
        showForm: false,
        transactionId: '',
        transactionIndex: '',
        transactionAmount: '',
        transactionDescription: '',
        transactionTag: '',
        transactionTagString: '',
        transactionTmpTag: '',
        transactionTimestamp: '',
        error: '',
        loading: true,
        visible: false
      }
      this.showForm = this.showForm.bind(this);
      this.handleTransactionAmount = this.handleTransactionAmount.bind(this);
      this.handleTransactionDescription = this.handleTransactionDescription.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.editTransaction = this.editTransaction.bind(this);
      this.addTransaction = this.addTransaction.bind(this)
      this.onSearch = this.onSearch.bind(this);
      this.onTagChange = this.onTagChange.bind(this);
    }
  
    showForm() {
      var currentTime = new Date();
      var month = currentTime.getMonth() + 1;
      var day = currentTime.getDate();
      var year = currentTime.getFullYear();

      this.setState({
        visible: true,
        modalTile: "Add New Transaction",
        transactionId: '',
        transactionTimestamp: year + "-" + month + "-" + day,
        transactionAmount: '',
        transactionDescription: '',
        transactionTag: '',
        transactionTagString: '',
        transactionTmpTag: ''
      });

      this.forceUpdate();
    }
  
    handleTransactionAmount(event) {
      this.setState({
        transactionAmount: event.target.value
      });
    }
  
    handleTransactionDescription(event) {
      this.setState({
        transactionDescription: event.target.value
      });
    }
  
    addTransaction() {
  
      /**
       * Validate user input
       */
      if(isNaN(this.state.transactionAmount)) {
  
        this.setState({
          error: 'Amount must be numbers',
        });
        this.forceUpdate();
        return;
  
      } else if (this.state.transactionAmount === '' || this.state.transactionDescription === '') {
  
        this.setState({
          error: 'All fileds are required',
        });
        this.forceUpdate();
        return;
  
      } else if (this.state.transactionAmount < 0) {
        
        this.setState({
          error: 'Amount cannot be negative',
        });
        this.forceUpdate();
        return;

      } else {
  
        this.setState({
          error: '',
        });
        this.forceUpdate();
  
      }
  
      this.setState({
        loading: true,
        visible: false
      });

      this.forceUpdate();
  
      /**
       * AJAX call to create a new transaction
       */
      axios({
  
        method: 'post',
        url: config.base_url+'api/v1/transaction',
        data: {
          amount: parseFloat(this.state.transactionAmount),
          description: this.state.transactionDescription,
          timestamp: moment(this.state.transactionTimestamp).unix(),
          tags: this.state.transactionTagString
        },
        headers: {
          'Authorization': 'Bearer ' + storage.getAuthToken()
        }
  
      })
        .then( (response) => {
          
          var oldTransactions = this.state.transactions;
          oldTransactions.unshift(response.data.data);

          this.setState({
            transactions: oldTransactions,
            loading: false
          });

          this.forceUpdate();

        })
        .catch( (error) => {
          
          console.log(error);
  
          this.setState({
            error: 'Server Error: Please contact administrator',
            loading: false
          });
  
        });
    }
  
    componentDidMount() {
  
      /**
       * AJAX call to get transactions from server
       */
      axios({
        method: 'get',
        url: config.base_url+'api/v1/transaction',
        headers: {
          'Authorization': 'Bearer ' + storage.getAuthToken()
        }
      })
      .then( (response) => {
  
        this.setState({
          transactions: response.data.data,
          loading: false
        })
      })
      .catch( (error) => {
  
        console.log(error);
  
        this.setState({
          error: 'Server Error: Please contact administrator',
          loading: false
        });
  
        this.forceUpdate();
  
      });
  
    }

    onDelete(id, index) {
      
      var tmpTransactions = this.state.transactions;
      tmpTransactions.splice(index, 1);
      this.setState( prevState => ({
        transactions: tmpTransactions,
        loading: false
      }));
  
      this.forceUpdate();

      // delete transactions from database using ajax
      axios({
        method: 'delete',
        url: config.base_url+'/api/v1/transaction/'+id,
        headers: {
          'Authorization': 'Bearer ' + storage.getAuthToken()
        },
        data: null
      }).then( (response) => {
        

      }).catch( (error) => {

        console.log(error);
  
        this.setState({
          error: 'Server Error: Please contact administrator',
          loading: false
        });
  
        this.forceUpdate();

      });

    }

    onEdit(id, index) {

      this.setState({
        transactionId: id,
        transactionIndex: index,
        modalTile: "Edit Transaction",
        visible: true,
        transactionTimestamp: moment(this.state.transactions[index].timestamp),
        transactionAmount: this.state.transactions[index].amount,
        transactionDescription: this.state.transactions[index].description,
        transactionTag: this.state.transactions[index].tags,
        transactionTagString: '',
        transactionTmpTag: ''
      });

      this.forceUpdate();

    }

    handleOk() {
      if(this.state.transactionId === '') {
        this.addTransaction();
      } else {
        this.editTransaction();
      }
    }

    editTransaction() {

      if(isNaN(this.state.transactionAmount)) {
  
        this.setState({
          error: 'Amount must be numbers',
        });
        this.forceUpdate();
        return;
  
      } else if (this.state.transactionAmount === '' || this.state.transactionDescription === '') {
  
        this.setState({
          error: 'All fileds are required',
        });
        this.forceUpdate();
        return;
  
      } else if (this.state.transactionAmount < 0) {
        
        this.setState({
          error: 'Amount cannot be negative',
        });
        this.forceUpdate();
        return;

      } else {
  
        this.setState({
          error: '',
        });
        this.forceUpdate();
  
      }

      var newTag = this.state.transactionTag;
      if(newTag === []) {
        newTag = [];
      }
  
      var oldTransactions = this.state.transactions;
      var newTransaction = {
        id: this.state.transactions[this.state.transactionIndex].id,
        amount: this.state.transactionAmount,
        description: this.state.transactionDescription,
        timestamp: this.state.transactionTimestamp.format("YYYY-MM-DD"),
        tags: newTag.concat(this.state.transactionTmpTag)
      }
      
      oldTransactions[this.state.transactionIndex] = newTransaction;

      this.setState({
        transactions: oldTransactions,
      });
  
      this.setState({
        visible: false
      });

      this.forceUpdate();

      axios({
  
        method: 'put',
        url: config.base_url+'api/v1/transaction/'+this.state.transactionId,
        data: {
          amount: parseFloat(this.state.transactionAmount),
          description: this.state.transactionDescription,
          timestamp: moment(this.state.transactionTimestamp).unix(),
          tags: this.state.transactionTagString
        },
        headers: {
          'Authorization': 'Bearer ' + storage.getAuthToken()
        }
  
      })
        .then( (response) => {
  
        })
        .catch( (error) => {
          
          console.log(error);
  
        });

    }

    handleCancel() {
      this.setState({
          visible: false
      });
    }

    onDateChange(date, dateString) {
      // use date.unix() e.g. 1542441716

      this.setState({
        transactionTimestamp: date || moment()
      });

      this.forceUpdate();

  }

    onAmountChange(event) {

      this.setState({
        transactionAmount: event.target.value
      });

      this.setState();

    }

    onDescriptionChange(event) {

      this.setState({
        transactionDescription: event.target.value
      });

      this.setState();
    }

    onTagChange(event) {

      // convert tags string to array
      var colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
      var tags = event.target.value.split(',');
      var transactionTag = [];

      for(var i = 0; i < tags.length; i++) {
        transactionTag.push({
          "name": tags[i],
          "color": colors[tags[i].charCodeAt(0) % colors.length]
        });
      }

      this.setState({
        transactionTmpTag: transactionTag,
        transactionTagString: event.target.value
      });

      this.forceUpdate();
    }

    onSearch(value) {

      this.setState({
        loading: true
      });

      this.forceUpdate();

      axios({
        method: 'post',
        url: config.base_url+'/api/v1/transaction/search',
        headers: {
          'Authorization': 'Bearer ' + storage.getAuthToken()
        },
        data: {
          "fragment": value
        },
      }).then( (response) => {

        this.setState({
          transactions: response.data.data,
          loading: false
        });

        this.forceUpdate();

      }).catch( (error) => {
        console.log(error);
      });

    }

    render() {
      /**
       * Styles
       */
      const thStyle = {
        fontSize: '20pt',
        color: '#2f4b6a',
        textAlign: 'left'
      }
  
      const tableStyle = {
        borderCollapse: 'collapse' ,
        width: '100%',
        padding: '10pt',
      }
  
      const timeStyle = {
        fontSize: '18pt',
        color: '#362010',
        textAlign: 'left'
      }
  
      const amountStyle = {
        fontSize: '18pt',
        color: '#002928',
        textAlign: 'left'
      }
  
      const descriptionStlye = {
        fontSize: '18pt',
        textAlign: 'left'
      }
  
      const secStyle = {
        fontSize: '18pt',
        color: '#367371',
        textAlign: 'left'
      }
  
      /**
       * Data
       */

      const columns = [
        {
          title: 'Transaction Date',
          dataIndex: 'timestamp',
          key: 'timestamp'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount'
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: 'Tags',
          dataIndex: '',
          key: 'tags',
          render: (text, record, index) => {

            var result = [];
            
            for(var i = 0; i < this.state.transactions[index].tags.length; i++) {
              if(this.state.transactions[index].tags[i] === '') {
                continue;
              }
              result.push(<Tag key={i} color={this.state.transactions[index].tags[i].color}>
              {this.state.transactions[index].tags[i].name}
              </Tag>);
            }

            return <div>{result}</div>
          }
        },
        {
          title: 'Actions',
          dataIndex: '',
          key: 'actions',
          render: (text, record, index) => (
            <div>
              <Button type="info" onClick={this.onEdit.bind(this, text.id, index)}> Edit </Button>
              <Button type="danger" onClick={this.onDelete.bind(this,text.id, index)}> Delete </Button>
            </div>
          )
        }
      ]
  
      /**
       * Table
       */
      const content = (
        <div>
        <div>
        <Button type="primary" size="large" onClick={this.showForm}><Icon type="form" theme="outlined" />Add New Transaction</Button> <br/><br/>

        <TransactionSearch onSearch={this.onSearch}> </TransactionSearch>
        <br/>
        </div>
  
        <Spin spinning={this.state.loading}>
          <Card>

            <Table rowKey="id" dataSource={this.state.transactions} columns={columns}  pagination={{ pageSize: 500 }}/>

          </Card>
        </Spin>

        <TransactionModal visible={this.state.visible} 
        handleOk={this.handleOk.bind(this)} handleCancel={this.handleCancel.bind(this)}
        onDateChange={this.onDateChange.bind(this)} onAmountChange={this.onAmountChange.bind(this)}
        onDescriptionChange={this.onDescriptionChange.bind(this)}
        transactionTimestamp={this.state.transactionTimestamp}
        transactionAmount={this.state.transactionAmount}
        transactionDescription={this.state.transactionDescription}
        transactionTag={this.state.transactionTag}
        transactionTagString={this.state.transactionTagString}
        modalTitle={this.state.modalTile}
        onTagChange={this.onTagChange}
        error={this.state.error}
        > </TransactionModal>

        </div>
      );
  
      return content;
    }
}
  
export default TransactionStatement;
