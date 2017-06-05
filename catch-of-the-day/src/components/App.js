import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

class App extends React.Component {

  constructor(){
    super();
    this.addFish = this.addFish.bind(this);
    //initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {
    //copy state
    const fishes = {...this.state.fishes};

    //update state
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //set state
    this.setState({fishes: fishes})

  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul>
            // {
            //   Object.keys(this.state.fishes).map(key => <Fish/>) 
            // }
            <Fish/>
          }
          </ul>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} />
      </div>  
      )
  }
}

export default App;