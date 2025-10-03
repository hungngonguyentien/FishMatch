import './SubmitButton.css'

function SubmitButton({setQuery1, setQuery2}){

    function search(){
        const searchBarOne = document.querySelectorAll(".fishSearchBar")[0];
        const searchBarTwo = document.querySelectorAll(".fishSearchBar")[1];

        setQuery1(searchBarOne.value);
        setQuery2(searchBarTwo.value);
    }

    return (
        <div className="buttonContainer">
            <button className="submitButton" onClick={search}>Check Compatibility</button>
            <div className="serverNote">(server may take ~50s to start)</div>
        </div>
    )
}

export default SubmitButton;