import "./styles.css"

import {useState} from "react";


function OptionsButton(props){

    const [selectedOption, setSelectedOption] = useState(props.option1)

    function handleClick(option){
        setSelectedOption(option)
        props.parentCallback(selectedOption)
    }

    return (
        <div className="options-button-container">
            <h3>{props.label}</h3>
            <div className="button-content">
                <button 
                    type="button" 
                    onClick={() => handleClick(props.option1)}
                    className={selectedOption === props.option1 ? "btn left active" : "btn left disabled"} 
                >
                    {props.option1}
                </button>
                <button 
                    type="button" 
                    onClick={() => handleClick(props.option2)}
                    className={selectedOption === props.option2 ? "btn right active" : "btn right disabled"} 
                >
                    {props.option2}
                </button>
            </div>
        </div>
    );
}

export default OptionsButton;