
function EncounterButton({onClick, text}) {
    return(
        <div>
            <button type="button" className="map-cell" id={text} onClick={onClick}>{text}</button>
        </div>
    )
}


export default EncounterButton;