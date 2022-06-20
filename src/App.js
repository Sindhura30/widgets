import React, {useState} from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: 'What is React?',
        content: 'React is a front-end library'
    },
    {
        title: 'Why use React?',
        content: 'React is a favorite library among engineers'
    },
    {
        title: 'How do we use React?',
        content: 'You use react by creating components'
    }
]

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
]


export default () => {
    const [selected, setSelected] = useState(options[0]);
    const [showDropdown, setShowDropDown] = useState();

    return (
    <div>
        <Header />
        <Route path="/">
            <Accordion items={items} />
        </Route>
        <Route path="/list">
            <Search/>
        </Route>
        <Route path="/dropdown">
            <Dropdown 
            label="Select a Color" 
            options={options}
            selected={selected}
            onSelectedChange={setShowDropDown}
            />
        </Route>
        <Route path="/translate">
            <Translate/>
        </Route>
    </div>)
}
