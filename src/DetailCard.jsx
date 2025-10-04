import './DetailCard.css';
import { useEffect, useState } from 'react';

function DetailCard({header, iconColor, score, fishOneName, fishTwoName, fishOneDisplayInfo, fishTwoDisplayInfo}) {

    const [updatedIconColor, UpdateIconColor] = useState(iconColor.high);
    const [displayState, setDisplayState] = useState(false);

    //Update data before display
    useEffect(()=>{
        if (score >= 0.9)
            UpdateIconColor(iconColor.high);
        else if (score >= 0.8)
            UpdateIconColor(iconColor.mediumHigh);
        else if (score >= 0.5)
            UpdateIconColor(iconColor.mediumLow);
        else
            UpdateIconColor(iconColor.low);
    }, [iconColor, score, fishOneName, fishTwoName, fishOneDisplayInfo])

    function toggleDisplay() {
        setDisplayState(prev => !prev)
    }

    return (
        <div className="detailCard" onClick={toggleDisplay}>
            <h2>{header}</h2>
            <div className='detailCardIcon' style={{backgroundColor: `${updatedIconColor}`}}></div>
            <div className='detailCardDetail' style={displayState ? {display:"block"} : {display:"none"}}>
                <h3>{fishOneName}</h3>
                {fishOneDisplayInfo ? fishOneDisplayInfo.map(info => <div>{info}</div>) : <></>}
                <h3>{fishTwoName}</h3>
                {fishTwoDisplayInfo ? fishTwoDisplayInfo.map(info => <div>{info}</div>) : <></>}
            </div>
        </div>
    );
}

export default DetailCard;