import React, { Component } from 'react'
// CSS
import './App.css'
import Header from "./components/Header";
import recettes from "./recettes";
import Admin from "./components/Admin";
import Card from "./components/Card";

// firebase
import base from './base'

class App extends Component {
  baseRef

  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  }

  componentDidMount() {
    this.baseRef = base.syncState(`/${this.state.pseudo}/recettes`, {context: this, state : 'recettes'});
  }

  componentWillUnmount() {
    base.removeBinding(this.baseRef);
  }

  addRecette = recette => {
    const recettes = {...this.state.recettes};
    recettes[`recette-${Date.now()}`] = recette;
    this.setState({recettes});
  }

  majRecette = (newRecette, key) => {
    const recettes = {...this.state.recettes};
    recettes[key] = newRecette;
    this.setState({recettes});
  }

  deleteRecette = (key) => {
    const recettes = {...this.state.recettes};
    recettes[key] = null;
    this.setState({recettes});
  }

  chargerExemple = () => this.setState({recettes})

  render () {

    const cards = Object
      .keys(this.state.recettes)
      .map(key => <Card key={key} details={this.state.recettes[key]} />)

    return (
      <div className='box'>
        <Header pseudo={this.state.pseudo} />
        <div className='cards'>
          {cards}
        </div>
        <Admin
          pseudo={this.state.pseudo}
          recettes={this.state.recettes}
          deleteRecette={this.deleteRecette}
          addRecette={this.addRecette}
          majRecette={this.majRecette}
          chargerExemple={this.chargerExemple} />
      </div>
    )
  }
}

export default App
