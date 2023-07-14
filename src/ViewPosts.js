import React, { useState } from 'react';
import { people } from './data.js';

export default function viewPosts () {
    const vtpeeps = people.filter((person) =>
        person.state === 'Vermont'
    );

    const [submitted, setSubmitted] = useState(false);

    //state selection
    //is there a way that I can use a library to grab all towns from each state?
    //also can I autogenerate a list of states instead?
    //const [selectedState, setSelectedState] = useState('');
    // function handleStateChange (e) {
    //     setSelectedState(e.target.value);
    // }

    //is there a way to use a library to autogenerate main towns from states?
    //const [town, setTown] = useState('Town name');
    // function handleTownChange(e) {
    //     setTown(e.target.value);
    // }

    return (
        <div>
            <p>AHEM! I'm trying to view a post here :/</p>
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