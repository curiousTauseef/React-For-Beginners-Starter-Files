import React from 'react';
import AddFishForm from './AddFishForm'
import base from '../base'

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: null,
            owner: null
        }
    }

    componentDidMount() {
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, {user});
            }
        })
    }

    handleChange(e, key){
        const fish = this.props.fishes[key];
        console.log(fish);
        const updatedFish = {...fish, [e.target.name]: e.target.value}
        this.props.updateFish(key, updatedFish);
    }

    logout() {
        base.unauth();
        this.setState(
            {
                uid: null, 
                owner: null
            }
        )
    }

    authenticate(provider) {
        console.log(`Trying to login with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    authHandler(error, authData) {
        if(error) {
            console.log(error);
            return;
        }

        //get store info
        const storeRef = base.database().ref(this.props.storeId);

        //query firebase for store data
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            
            //claim if no owner
            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });

        });


    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Login with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Login with Twitter</button>

            </nav>

        )
    }

    renderInventory(key){ 
        const fish = this.props.fishes[key];          
        return(
                <div className="fish-edit" key={key}>
                    <input type="text" placeholder="Fish Name" name="name" value={fish.name} onChange={(e) => this.handleChange(e, key)}/>
                    <input type="text" placeholder="Fish Price" name="price" value={fish.price} onChange={(e) => this.handleChange(e, key)}/>
                    <select placeholder="Fish Status " name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
                        <option value="available">Fresh!</option>
                        <option value="unavailable">Sold Out</option>
                    </select>
                    <textarea placeholder="Fish Desc" name="desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)}></textarea>
                    <input type="text" placeholder="Fish Image" name="image"  value={fish.image} onChange={(e) => this.handleChange(e, key)}/>
                    <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
                </div>
            )
    }

    render() {
        const logout = <button onClick={this.logout}>Logout</button>
        //check if user logged in
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        //check if user is the owner
        if(this.state.uid !== this.state.owner) {
            return (
            <div>
                <p>Sorry you are not the owner of this store!</p>
                {logout}
            </div>
            )
        }

        return(
            <div>
              <h2>Inventory</h2>
              {logout}
              {Object.keys(this.props.fishes).map(this.renderInventory)}
              <AddFishForm addFish={this.props.addFish} />
              <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
          )
    }
}

Inventory.propTypes = {
    updateFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired,
    storeId: React.PropTypes.string.isRequired
}

export default Inventory;