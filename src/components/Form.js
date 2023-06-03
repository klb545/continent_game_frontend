import { useState } from "react";

const Form = ({submitGuess}) => {

    const [stateGuess, setStateGuess] = useState();

    const handleChange = (e) => {
        // let messageName = e.target.name;
        // let copiedMessageObject = {...stateMessage};
        // copiedMessageObject = e.target.value;
        setStateGuess(e.target.value);
    }

    const handleSubmitGuess = (e) => {
        e.preventDefault();
        submitGuess(stateGuess);
    }

    return ( 
        <>
            <form onSubmit={handleSubmitGuess}>
                <input type="text" 
                id="id_guess"
                name="guess" 
                placeholder="type your guess here"
                value={stateGuess}
                onChange={handleChange}
                autoComplete="off"/>
                <button type="submit">
                    Submit Answer
                </button>
            </form>
        </>
    );
}
 
export default Form;