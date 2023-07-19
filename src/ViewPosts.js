import React, { useState } from 'react';
import { people } from './data.js';
import { floodData } from './data.js';
import { State, City } from 'country-state-city';

export default function ViewPosts () {

    //state selection
    let selectedStateCode = '';
    const [selectedState, setSelectedState] = useState('');
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        console.log("selected state " + e.target.value)
        // selectedStateCode = State.selectedState.stateCode
        selectedStateCode = e.target.value;
        console.log("selected state code: " + selectedStateCode)
        console.log(City.getCitiesOfState('US', {selectedStateCode})) //works when hardcoded for a state
    }

    //is there a way to use a library to autogenerate main towns from states?
    const [town, setTown] = useState('Town name');
    function handleTownChange(e) {
        setTown(e.target.value);
    }

    const stateOptions = State.getStatesOfCountry('US').map(state => ({
        value: state.stateCode,
        label: state.name
    }));

    //imported data from data.js
    const vtpeeps = people.filter((person) =>
        person.state === 'Vermont'
    );
    const stateFloodData = floodData.filter((entry) =>
        //console.log("selected state code: " + selectedStateCode + " // entry's state: " + entry.state)
        entry.state === 'VT' // only likes strings, not variables
        // selectedStateCode.equals(entry.state)
    );
    console.log("all flood data: " + floodData[0].state);
    console.log("cut down flood data: " + stateFloodData);

    return (
        <div>
            <h1>Let's filter this out:</h1>
            <h3>State:</h3>
            <select value={selectedState} onChange={handleStateChange}>
                <option value=""> -- Select -- </option>
                {State.getStatesOfCountry('US').map(state =>
                    <option value={state.stateCode}>{state.name}</option>
                )}
            </select>
            {selectedState?(
                <div>
                    <h3>Town:</h3>
                    <select value={town} onChange={handleTownChange}>
                        <option value=""> -- Select -- </option>
                        {console.log("right before execution this is the code: " + selectedStateCode)}
                        {City.getCitiesOfState('US', {selectedStateCode}).map(town =>
                            <option value={town.name}>{town.name}</option>
                        )}
                    </select>
                </div>
            ):<br></br>}
            <p>Disaster victims: </p>
            <ul>
                {stateFloodData.map(entry =>
                    <li key={entry.id}>
                        <p>
                            <b>{entry.name}:</b>
                            {' has some problems: ' + entry.issue + '.'}
                        </p>
                    </li>
                )}
            </ul>
        </div>
    );
}

            /* <p>Everyone:</p>
            <ul>
                {people.map(person =>
                    <li key={person.id}>
                        <p>
                            <b>{person.name}:</b>
                            {' is a ' + person.profession + '.'}
                        </p>
                    </li>
                )}
            </ul>
            <p>Now just the Vermonters!</p>
            <ul>
                {vtpeeps.map(person =>
                    <li key={person.id}>
                        <p>
                            <b>{person.name}:</b>
                            {' is a ' + person.profession + '.'}
                        </p>
                    </li>
                )}
            </ul> */