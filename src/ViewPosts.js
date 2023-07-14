import Post from './Post.js'
import { people } from './data.js';

export default function viewPosts () {
    const vtpeeps = people.filter(person =>
        person.state === 'Vermont'
    );
    return (
        <div>
            <p>AHEM! I'm trying to view a post here :/</p>
            <Post />
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