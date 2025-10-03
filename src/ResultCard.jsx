import './ResultCard.css';
import { useState, useEffect } from 'react';
import DetailCard from './DetailCard.jsx';

const scoreColors = {
    high: 'rgba(73, 225, 31, 1)', // Green
    mediumHigh: 'rgba(241, 218, 14, 1)', // Yellow Green
    mediumLow: '#df6624ff', // Orange
    low: '#e11812ff' // Red
};

function ResultCard({result}) {
    const [totalScore, setTotalScore] = useState(0);
    const [overallComment, setOverallComment] = useState("");
    const [possibleIssues, setPossibleIssues] = useState([]);

    // Update score and color when result changes
    useEffect(() => {
        // Update total score when result changes
        setTotalScore(result ? result.compatibility.totalScore : 0);

        // Set color based on 
        if (result){
            if (result.compatibility.totalScore >= 0.9) document.documentElement.style.setProperty('--score-color', scoreColors.high);
            else if (result.compatibility.totalScore >= 0.8) document.documentElement.style.setProperty('--score-color', scoreColors.mediumHigh);
            else if (result.compatibility.totalScore >= 0.5) document.documentElement.style.setProperty('--score-color', scoreColors.mediumLow);
            else document.documentElement.style.setProperty('--score-color', scoreColors.low);
        }

        // Animation
        const scoreBox = document.querySelector('.scoreBox');
        if (scoreBox) {
            scoreBox.classList.remove('animate');
            void scoreBox.offsetWidth; // Trigger reflow to restart the animation
            scoreBox.classList.add('animate');
        }
    }, [result]);

    // Update overall comment when result changes
    useEffect(() => {
        setOverallComment(result ? result.compatibility.overallComment : "");
        if (result){
            setPossibleIssues(result.compatibility.possibleIssues);
        }
    }, [result]);

    return (
        <>
        { result && result.ok ?
            <>
                <div className="resultCard">
                    <div className="scoreAndComment">
                        <div className='scoreBox'>
                            <div className='scoreTextBox'>{(totalScore*100).toFixed(0)}%</div>
                        </div>
                    <div className='overallCommentBox'>
                        <h2>{overallComment}</h2>
                        <p>Possible issues: {totalScore === 1 ? "none" :""}</p>
                        <ul className='possibleIssuesList'>
                            {possibleIssues.map((issue, ind) => <li key={ind}>
                                {issue}
                            </li>)}
                        </ul>
                    </div>
                    </div>
                    <div className='detailCardContainer'>
                        <DetailCard key="1" header="Water parameters" iconColor={scoreColors} score={result.compatibility.water.waterScore} fishOneName={result.fish1Data[0].commonName} fishTwoName={result.fish2Data[0].commonName} fishOneDisplayInfo={[`Temperature: ${result.fish1Data[0].water.temperature}`, `PH: ${result.fish1Data[0].water.ph}`]} fishTwoDisplayInfo={[`Temperature: ${result.fish2Data[0].water.temperature}`, `PH: ${result.fish2Data[0].water.ph}`]} />
                        <DetailCard key="2" header="Behaviours" iconColor={scoreColors} score={result.compatibility.behaviour.behaviourScore} fishOneName={result.fish1Data[0].commonName} fishTwoName={result.fish2Data[0].commonName} fishOneDisplayInfo={result.fish1Data[0].behaviours} fishTwoDisplayInfo={result.fish2Data[0].behaviours}/>
                        <DetailCard key="3" header="Size" iconColor={scoreColors} score={result.compatibility.size.sizeScore} fishOneName={result.fish1Data[0].commonName} fishTwoName={result.fish2Data[0].commonName} fishOneDisplayInfo={[`${result.fish1Data[0].maxSize} cm` ]} fishTwoDisplayInfo={[`${result.fish2Data[0].maxSize} cm` ]}/>
                    </div>
                </div> 
            </>
                
                : <></>
        }
        </>
    )
}

export default ResultCard;