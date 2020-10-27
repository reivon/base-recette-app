import React, {Component} from 'react';
import AjouterRecette from "./AjouterRecette";
import AdminForm from "./AdminForm";
import Login from "./Login";

//firebase / facebook
import firebase from "firebase/app";
import 'firebase/auth'
import base, {firebaseApp} from "../base";

class Admin extends Component {
  state = {
    uid: null,
    chef: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.handleAuth({user});
      }
    })
  }

  authenticate = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp.auth()
      .signInWithPopup(provider)
      .then(this.handleAuth);
  }

  handleAuth = async authData => {
    const box = await base.fetch(this.props.pseudo, {context: this});
    if (!box.chef) {
      await base.post(`${this.props.pseudo}/chef`, {
        data: authData.user.uid
      })
    }
    this.setState({
      uid: authData.user.uid,
      chef: box.chef || authData.user.uid
    })
  };

  logout = async () => {
    console.log('Déconnexion');
    await firebase.auth().signOut();
    this.setState({uid: null})
  }

  render() {
    const {recettes, addRecette, majRecette, chargerExemple, deleteRecette} = this.props;

    const logout = <button onClick={this.logout}>Déconnexion</button>

    // si user not connected
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }

    if (this.state.uid !== this.state.chef) {
      return (
        <div>
          <p>Tu n'es pas le chef de cette boite !</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="cards">
        <AjouterRecette addRecette={addRecette}/>
        {
          Object.keys(recettes)
            .map(key => <AdminForm
              key={key}
              id={key}
              deleteRecette={deleteRecette}
              majRecette={majRecette}
              recettes={recettes}/>)
        }
        <footer>
          {logout}
          <button onClick={chargerExemple}>Remplir</button>
        </footer>
      </div>
    );
  }
}

export default Admin;