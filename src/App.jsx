import { useState, useEffect } from "react";
import FishSearchBar from "./FishSearchBar.jsx";
import SubmitButton from "./SubmitButton.jsx";
import ResultCard from "./ResultCard.jsx";
import NavBar from './NavBar.jsx';
import { Helmet } from "react-helmet-async";
import './App.css'
const apiUrl = import.meta.env.VITE_API_URL_RESULT;

function App(){
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [result, setResult] = useState(null);

  //Fetch data after user click button
  useEffect(()=>{
    //Fetch data function
    async function fetchData() {
      try{
        const response = await fetch(apiUrl,{
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
      <Helmet>
        <title>Fish Match | Aquarium Fish Compatibility Checker</title>
        <meta
          name="description"
          content="Check fish compatibility instantly. Fish Match helps you find the best tank mates and avoid conflicts in your aquarium."
        />
        <meta
          name="keywords"
          content="fish compatibility, aquarium fish, tank mates, fish match"
        />
      </Helmet>
      <NavBar />
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