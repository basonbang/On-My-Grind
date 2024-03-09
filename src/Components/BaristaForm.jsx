import React, {Component, useState} from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "/drinks.json"

const BaristaForm = () => {

  const [inputs, setInputs] = useState({
    'temperature': '',
    'milk': '',
    'syrup': '',
    'blended': ''
  });

  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  const [currentDrink, setCurrentDrink] = useState("");
  const [currentDrinkRecipe, setCurrentDrinkRecipe] = useState({});
  const [correct_temp, setCheckedTemperature] = useState('');
  const [correct_syrup, setCheckedSyrup] = useState('');
  const [correct_milk, setCheckedMilk] = useState('');
  const [correct_blended, setCheckedBlended] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({...inputs, [name]: value})
  };
  
  const onCheckAnswer = () => {
    
    (currentDrinkRecipe.temp != inputs['temperature']) ? setCheckedTemperature('wrong') :       setCheckedTemperature('correct');
    (currentDrinkRecipe.syrup != inputs['syrup']) ? setCheckedSyrup('wrong') : setCheckedSyrup('correct');
    (currentDrinkRecipe.milk != inputs['milk']) ? setCheckedMilk('wrong') : setCheckedMilk('correct');
    (currentDrinkRecipe.blended != inputs['blended']) ? setCheckedBlended('wrong') : setCheckedBlended('correct');
    
  };

  const getNextDrink = () => {
    let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
    setCurrentDrinkRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
  }
  
  const onNewDrink = () => {
    setInputs({
      'temperature': '',
      'milk': '',
      'syrup': '',
      'blended': '' });
    setCheckedTemperature('');
    setCheckedSyrup('');
    setCheckedMilk('');
    setCheckedBlended('');

    getNextDrink();
  };

  return (
    <div>

      <h2> Hi, I'd like to order a: </h2>
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink}</h2>
        <button type="new-drink-button" className="button newdrink" onClick={onNewDrink}>🔄</button>
      </div>
      
      <form className="container">
        <div className="mini-container">
          <h3>Temperature</h3>
          <div className="answer-space" id={correct_temp}>
            {inputs["temperature"]} 
          </div>
          <RecipeChoices
            label="temperature"
            handleChange={handleChange}
            choices={ingredients["temperature"]}
            checked={inputs["temperature"]}
          />
        </div>

        <div className="mini-container">
          <h3>Milk</h3>
          <div className="answer-space" id={correct_milk}>
            {inputs["milk"]} 
          </div>
          <RecipeChoices
            label="milk"
            handleChange={handleChange}
            choices={ingredients["milk"]}
            checked={inputs["milk"]}
          />
        </div>

        <div className="mini-container">
          <h3>Syrup</h3>
          <div className="answer-space" id={correct_syrup}>
            {inputs["syrup"]} 
          </div>
          <RecipeChoices
            label="syrup"
            handleChange={handleChange}
            choices={ingredients["syrup"]}
            checked={inputs["syrup"]}
          />
        </div>

        <div className="mini-container">
          <h3>Blended</h3>
          <div className="answer-space" id={correct_blended}>
            {inputs["blended"]} 
          </div>
          <RecipeChoices
            label="blended"
            handleChange={handleChange}
            choices={ingredients["blended"]}
            checked={inputs["blended"]}
          />
        </div>
      </form>
      
      <button type="submit" className="button submit" onClick={onCheckAnswer}>
        Check Answer
      </button>
      
      <button type="new-drink-button" className="button submit" onClick={onNewDrink}>
        New Drink
      </button>
      
    </div>
  );

};

export default BaristaForm;