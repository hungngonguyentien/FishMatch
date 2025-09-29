import './FishSearchBar.css'
import { useState } from 'react';

function FishSearchBar({header}) {
    const [searchContent, setSearchContent] = useState("");
    const [suggestList, setSuggestList] = useState([]);

    function handleChange(e){
        setSearchContent(e.target.value);
        handleSearch(e.target.value );
    }

    async function handleSearch(query){
        try{
            if (query.length >= 1) {
                const response = await fetch("http://localhost:3000/api/search",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });
            const data = await response.json();
            setSuggestList(data.map(fishData => fishData.commonName));
            }
            else {
                setSuggestList([]);
            }
        } catch (err){
            console.error(err);
        }
    }

    async function suggestPick(fishname){;
        //Set choice to be the search value
        setSearchContent(fishname);
        setSuggestList([]);
    }

    return(
        <>
            <div className='SearchContainer'>
                <h2 style={{margin:"2px"}}>{header}</h2>
                <input className="fishSearchBar" value={searchContent} placeholder='Eg: Betta' onChange={handleChange}></input>
                {
                    suggestList.length > 0 ? <div className='suggestListContainer'>{
                        suggestList.map((fishName, index) => {
                            return <div className="suggestItem" key={index} onClick={()=>suggestPick(fishName)}>{fishName}</div>;
                        })} 
                    </div> : <></>
                }
            </div>
        </>
    )
}

export default FishSearchBar;