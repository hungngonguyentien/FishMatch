import { useState, useEffect } from "react";
import FishSearchBar from "./FishSearchBar.jsx";
import SubmitButton from "./SubmitButton.jsx";
import ResultCard from "./ResultCard.jsx";
import './App.css'

function App(){
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [result, setResult] = useState(null);

  //Fetch data after user click button
  useEffect(()=>{
    //Fetch data function
    async function fetchData() {
      try{
        const response = await fetch("http://localhost:3000/api/checkCompatibility",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query1, query2 })
        });
        const data = await response.json();
        setResult(data);
      }
      catch(err){
        console.error(err);
      }
    }
    //Call the function
    if(query1 != "" && query2!=""){
      fetchData();
    }
  }, [query1,query2]);

  //Do the work when result is update
  useEffect(()=>{
    if (result){
      if(result.ok===false){
        alert("One of the fish is not found in the database. Please try again.");
      }
      else{
        console.log(result);
      }
    }
  }, [result]);

  return (
    <>
      <div className="searchCard">
        <div>
          <FishSearchBar header="Fish A"/>
          <FishSearchBar header="Fish B"/>
        </div>
        <div>
          <SubmitButton setQuery1={setQuery1} setQuery2={setQuery2}></SubmitButton>
        </div>
      </div>
      {result && result.ok && <ResultCard result={result}/>}
      
    </>
  );
}   

export default App;