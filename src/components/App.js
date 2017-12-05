import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import {getCustomerList, postCustomer, getCustomer, createCustomer, updateCustomer, deleteCustomer} from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: [],
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.postCustomer = this.postCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  componentDidMount(){
    axios.get().then(list => {
      this.setState({customerList: list});
    })
  }

  startNewCustomer(){
    this.setState({
      creating: true,
      initialLoad: false,
      currentCustomer: null
    })
  }

  postCustomer(customer){
    createCustomer(customer).then(response => {
      getCustomerList().then(list => {
        this.setState({
          initialLoad: true,
          creating: false,
          currentCustomer: null
        })
      })
    })
  }

  selectCustomer(id){
    getCustomer(id).then(response =>{
      this.setState({
        currentCustomer: response,
        initialLoad: false
      })
    })
  }

  saveEdit(id, obj){
    updateCustomer(id, obj).then(updatedCustomer => {
      getCustomerList().then(list => {
        this.setState({
          customerList: list,
          currentCustomer: updatedCustomer
        })
      })
    })
  }

  removeCustomer(id){
    deleteCustomer(id).then(deleteCustomer => {
      getCustomerList().then(list => {
        this.setState({
          customerList: list, 
          currentCustomer: null,
          initalLoad: true
        })
      })
    })
}

  
  render() {
        return (
          <div>
            <Header />
            <div className="App__container">
              {
                this.state.customerList ?
                <List
                  customerList={this.state.customerList || []}
                  startNewCustomer={this.startNewCustomer}
                />
                : null
              } 
              <Workspace initialLoad={this.state.initialLoad}
                        createCustomer = {this.createCustomer}
                        currentCustomer={this.state.currentCustomer}
                        creating={this.state.creating}
                        saveEdit={this.saveEdit}
                        removeCustomer={this.removeCustomer}
              />
            </div>
          </div>
        )
      }
    }
    
export default App;


// import {getCustomerList, createCustomer, getCustomer, updateCustomer, deleteCustomer} from '../customers'

// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       customerList: [],
//       initialLoad: true,
//       creating: false,
//       currentCustomer: null
//     }
//       this.startNewCustomer = this.startNewCustomer.bind(this);
//       this.createCustomer = this.createCustomer.bind(this);
//       this.selectCustomer = this.selectCustomer.bind(this);
//       this.removeCustomer = this.removeCustomer.bind(this);
//   }

// startNewCustomer() {
//   this.setState({
//     creating: true,
//     initialLoad: false,
//     currentCustomer: null
//   })
// }

// createCustomer(customer) {
//   createCustomer(customer).then(response => {
//     getCustomerList().then(list => {
//       this.setState({
//         initialLoad: true,
//         creating: false,
//         customerList: list,
//       })
//     })
//   })
//  }

//  selectCustomer(id) {
//    getCustomer(id).then(response => {
//      this.setState({
//        currentCustomer: response,
//        initialLoad: false
//      })
//    })
//  }

//  saveEdit(id, obj) {
//    updateCustomer(id, obj).then(updatedCustomer => {
//      getCustomerList().then(list => {
//        this.setState({
//          customerList: list,
//          currentCustomer: updatedCustomer
//        })
//      })
//    })
//  }

//  removeCustomer(id) {
//    deleteCustomer(id).then(deletedCustomer => {
//      getCustomerList().then(list => {
//        this.setState({
//           customerList: list,
//           currentCustomer: null,
//           initialLoad: true
//        })
//      })
//    })
//  }

//   componentDidMount() {
//     getCustomerList().then(list => {
//       this.setState({customerList: list});
//   })
// }

//   render() {
//     return (
//       <div>
//         <Header />
//         <div className="App__container">
//           {
//             this.state.customerList ?
//             <List
//               selectCustomer = {this.selectCustomer}
//               startNewCustomer = {this.startNewCustomer}
//               customerList={this.state.customerList || []}
//               />
//             : null
//           }
//           <Workspace initialLoad={this.state.initialLoad}
//                     createCustomer={this.createCustomer}
//                     currentCustomer={this.state.currentCustomer}
//                     creating={this.state.creating}
//                     saveEdit={this.saveEdit}
//                     removeCustomer={this.removeCustomer}
//                   />
//         </div>
//       </div>
//     )
//   }
// }

// export default App;
