import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setDebouncedTerm(term)
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
        }

    }, [term])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action : 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch : debouncedTerm
                },
            });
            setResults(data.query.search);
        }
        search();
    }, [debouncedTerm])

    const renderedList = results.map((result) => {
        return (
            <div key={result.id} className="item">
                <div className="right floated content">
                    <a href={`https://wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
                </div>
            </div>
        )
    })

    return (
    <div className="ui form"> 
         <div className="field"> 
            <label>Enter Search Term</label>
            <input className="input" value={term} onChange={(e) => setTerm(e.target.value)} />
         </div>
         <div className="ui celled list">{renderedList}</div>
    </div>
    )
}

export default Search;