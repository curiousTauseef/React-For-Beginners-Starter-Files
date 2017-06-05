import React from 'react';
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  // constructor() {
  //   super()
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    //get box text
    const storeId = this.storeInput.value;
    //change url
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={ (e) => this.goToStore(e) }>
      {/* This is a comment*/}
        <h2>Please Enter a Store</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()} required ref={ (input) => {this.storeInput = input} }/>
        <button type="submit" >Visit Store -></button>
      </form>
      ) 
  }
}

StorePicker.contextTypes = {
  router : React.PropTypes.object
}

export default StorePicker;