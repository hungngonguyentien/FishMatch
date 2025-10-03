import './NavBar.css';

function NavBar(){
    const checkLink = import.meta.env.VITE_CHECKCOMPATIBILITY_LINK;
    return (
        <header className="appNav">
            <div className="navLeft">
                <span className="fishIcon">🐟</span>
                <span className="brand">FishMatch</span>
            </div>
            <div className="navRight">
                <a className="navItem navCheck" href={checkLink} target="_blank" rel="noopener noreferrer">Check Compatibility</a>
            </div>
        </header>
    )
}

export default NavBar;
