import React, { useState } from 'react';
import { people } from './data.js';
import { Country, State, City } from 'country-state-city';
import { getStatesOfCountry } from 'country-state-city/lib/state.js';

export default function ViewPosts () {
    const vtpeeps = people.filter((person) =>
        person.state === 'Vermont'
    );

    const [submitted, setSubmitted] = useState(false);

    //state selection
    //is there a way that I can use a library to grab all towns from each state?
    //also can I autogenerate a list of states instead?
    const [selectedState, setSelectedState] = useState('');
    function handleStateChange (e) {
        setSelectedState(e.target.value);
        console.log("selected state " + selectedState)
    }

    //is there a way to use a library to autogenerate main towns from states?
    const [town, setTown] = useState('Town name');
    function handleTownChange(e) {
        setTown(e.target.value);
    }

    const stateOptions = getStatesOfCountry('US').map(state => ({
        value: state.stateCode,
        label: state.name
    }));

    return (
        <div>
            <p>AHEM! I'm trying to view a post here :/</p>
            <h1>Let's filter this out:</h1>
            <h3>State:</h3>
            <select value={selectedState} onChange={handleStateChange}>
                <option value=""> -- Select -- </option>
                {getStatesOfCountry('US').map(state =>
                    <option value={state.stateCode}>{state.name}</option>
                )}
                <option value="VT">Vermont</option>
                <option value="NH">New Hampshire</option>
            </select>
            {selectedState?(
                <div>
                    <h3>Town:</h3>
                    <textarea 
                        placeholder='town'
                        value={town}
                        onChange={handleTownChange}
                    />
                </div>
            ):<br></br>}
            <p>Everyone:</p>
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
            </ul>
        </div>
    );
}