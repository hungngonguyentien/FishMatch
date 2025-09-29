import './SubmitButton.css'

function SubmitButton({setQuery1, setQuery2}){

    function search(){
        const searchBarOne = document.querySelectorAll(".fishSearchBar")[0];
        const searchBarTwo = document.querySelectorAll(".fishSearchBar")[1];

        setQuery1(searchBarOne.value);
        setQuery2(searchBarTwo.value);
    }

    return (
        <>
            <button className="submitButton" onClick={search}>Check Compatibility</button>
        </>
    )
}

export default SubmitButton;