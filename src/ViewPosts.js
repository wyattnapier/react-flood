import Post from './Post.js'
import { people } from './data.js';

export default function viewPosts () {
    // component for each post that 
    return (
        <div>
            <p>AHEM! I'm trying to view a post here :/</p>
            <Post />
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
        </div>
    );
}