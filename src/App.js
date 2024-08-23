import React, { useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [group, setGroup] = useState('frutas');
  const [options, setOptions] = useState({
    frutas: [
      { value: 'apple', text: 'Maçã', color: '#ff0000' },
      { value: 'banana', text: 'Banana', color: '#ffff00' },
      { value: 'orange', text: 'Laranja', color: '#ffcc99' }
    ],
    vegetais: [
      { value: 'carrot', text: 'Cenoura', color: '#ff9933' },
      { value: 'broccoli', text: 'Brócolis', color: '#66ff66' },
      { value: 'spinach', text: 'Espinafre', color: '#009900' }
    ]
  });
  const [selectedText, setSelectedText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [newOption, setNewOption] = useState({ group: '', value: '', color: '' });

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = options[group].find(option => option.value === selectedValue);
    if (selectedOption) {
      setSelectedText(`Você escolheu: ${selectedOption.text}`);
      setBackgroundColor(selectedOption.color);
    }
  };

  const handleAddOption = (event) => {
    event.preventDefault();

    const { group, value, color } = newOption;
    const newOptionObject = {
      value: value.toLowerCase().replace(/\s+/g, '-'),
      text: value,
      color
    };

    setOptions(prevOptions => ({
      ...prevOptions,
      [group]: [...prevOptions[group], newOptionObject]
    }));

    setNewOption({ group: '', value: '', color: '' });
  };

  return (
    <div className="container">
      <h1>O que tem na sua geladeira:</h1>
      <div className="select-wrapper">
        <select id="options" onChange={handleChange}>
          {Object.keys(options).map(g => (
            <optgroup key={g} label={g.charAt(0).toUpperCase() + g.slice(1)} id={g}>
              {options[g].map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <p style={{ backgroundColor }}>{selectedText}</p>

      <h2>Adicionar novo alimento:</h2>
      <form id="add-option-form" onSubmit={handleAddOption}>
        <label htmlFor="option-group">Tipo:</label>
        <select
          id="option-group"
          value={newOption.group}
          onChange={(e) => setNewOption(prev => ({ ...prev, group: e.target.value }))}
          required
        >
          <option value="frutas">Frutas</option>
          <option value="vegetais">Vegetais</option>
        </select>
        <br />
        <br />
        <label htmlFor="option-value">Valor:</label>
        <input
          type="text"
          id="option-value"
          value={newOption.value}
          onChange={(e) => setNewOption(prev => ({ ...prev, value: e.target.value }))}
          required
        />
        <br />
        <br />
        <label htmlFor="option-color">Cor (#xxx):</label>
        <input
          type="text"
          id="option-color"
          value={newOption.color}
          onChange={(e) => setNewOption(prev => ({ ...prev, color: e.target.value }))}
          required
        />
        <br />
        <br />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default App;
