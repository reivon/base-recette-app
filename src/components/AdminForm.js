import React from 'react';

const AdminForm = ({id: key, majRecette, recettes, deleteRecette}) => {
  const recette = recettes[key];

  const handleChange = (event, key) =>  {
    const {name, value} = event.target;
    const recette = recettes[key];
    recette[name] = value;
    majRecette(recette, key);
  }

  return (
    <div className='card'>
      <form className="admin-form">
        <input onChange={e => handleChange(e, key)} value={recette.nom} type="text" name='nom' placeholder='Nom de la recette'/>
        <input onChange={e => handleChange(e, key)} value={recette.image} type="text" name='image' placeholder="Adresse de l'image"/>
        <textarea onChange={e => handleChange(e, key)} value={recette.ingredients} name="ingredients" rows="3" placeholder='Liste des ingrédients'/>
        <textarea onChange={e => handleChange(e, key)} value={recette.instructions} name="instructions" rows="15" placeholder='Liste des instructions'/>
      </form>
      <button onClick={() => deleteRecette(key)}>Supprimer</button>
    </div>
  );
};

export default AdminForm;
