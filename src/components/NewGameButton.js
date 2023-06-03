const NewGameButton = ({ currentPlayer, createNewGameOnDbSideAndSetNewGameMessage}) => {

    const handleClick = () => {
        createNewGameOnDbSideAndSetNewGameMessage(currentPlayer.id);
    }

    return ( 
        <>
            <button onClick={handleClick}>
                Create New Game
            </button>
        </>
    );
}
 
export default NewGameButton;