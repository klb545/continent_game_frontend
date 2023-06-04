import React, { useEffect, useState } from "react"
import MapChart from './MapChart';
import NewGameButton from "../components/NewGameButton";
import Form from "../components/Form";
import CurrentGameStats from "../components/CurrentGameStats";
import SelectPlayerButton from "../components/SelectPlayerButton";
// import ResponseToGuess from "../components/ResponseToGuess";
const SERVER_URL = 'http://localhost:8080';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master"

const MainContainer = () => {
    const [allGamesList, setAllGamesList] = useState([]);
    const [allPlayersList, setAllPlayersList] = useState([]);

    const [currentGame, setCurrentGame] = useState(null);
    const [currentContinent, setCurrentContinent] = useState({});
    const [currentPlayer, setCurrentPlayer] = useState({});
    const [topologyUrl, setTopologyUrl] = useState(`${geoUrl}/world-countries-sans-antarctica.json`);

    const [newGameMessage, setNewGameMessage] = useState({});

    const [gameOver, setGameOver] = useState(false);

    // FETCH ALL GAMES - GET
    const fetchAllGamesList = async () => {
        const gamesListResponse = await fetch(`${SERVER_URL}/games`);
        const gamesListJsonData = await gamesListResponse.json();
        setAllGamesList(gamesListJsonData);
        return(gamesListJsonData);
    };
    // FETCH ALL PLAYERS - GET
    const fetchAllPlayersList = async () => {
        const allPlayersResponse = await fetch(`${SERVER_URL}/players`);
        const allPlayersJsonData = await allPlayersResponse.json();
        setAllPlayersList(allPlayersJsonData);
    };

    // CHOOSE PLAYER BY ID - GET BY ID
    const fetchSelectedPlayer = async (playerId) => {
        const playerResponse = await fetch(`${SERVER_URL}/players/${playerId}`);
        const playerJsonData = await playerResponse.json();
        setCurrentPlayer(playerJsonData);
    }

    useEffect(()=>{
        fetchAllGamesList();
        fetchAllPlayersList();
        // createNewGameOnDbSideAndSetNewGameMessage(1);
    }, [])

    // CREATE MAP BASED ON CONTINENT OF CURRENT GAME
    const createMap = () => {
        if(currentGame == null) {
            return 
        }
        if(currentGame.continent.id == 1){
            setTopologyUrl(`${geoUrl}/continents/africa.json`);
        }
        if(currentGame.continent.id == 2){
            setTopologyUrl(`${geoUrl}/continents/asia.json`);
        }
        if(currentGame.continent.id == 3){
            setTopologyUrl(`${geoUrl}/continents/europe.json`);
        }
        if(currentGame.continent.id == 5){
            setTopologyUrl(`${geoUrl}/continents/oceania.json`);
        }
        if(currentGame.continent.id == 4){
            setTopologyUrl(`${geoUrl}/continents/north-america.json`);
        }
        if(currentGame.continent.id == 6){
            setTopologyUrl(`${geoUrl}/continents/south-america.json`);
        }
    };


    // CREATE NEW GAME
    const createNewGameOnDbSideAndSetNewGameMessage = async (playerId) => {
        // send to db
        const response = await fetch(`${SERVER_URL}/games?playerId=${playerId}`, {
            method: "POST",
            headers: {"Content-type" : "application/json"},
        })
        // send to client-side
        const replyForNewGameHasStarted = await response.json();
        setNewGameMessage(replyForNewGameHasStarted);
        fetchAllGamesList().then((gamesListJsonData) => {
            setCurrentGame(gamesListJsonData[gamesListJsonData.length - 1]);
          });
    }

    useEffect(()=>{
        if(currentGame){
            createMap();
            fetchSelectedPlayer(currentGame.player.id);
            setCurrentContinent(currentGame.continent.name);
        }
    },[currentGame])

    // FETCH SPECIFIC GAME - GET BY ID
    // setCurrentGame
    // setContinent
    const fetchSpecificGame = async (gameId) => {
        const gameByIdResponse = await fetch(`${SERVER_URL}/games/${gameId}`);
        const gameByIdJsonData = await gameByIdResponse.json();
        setCurrentGame(gameByIdJsonData);
        return(gameByIdJsonData)
        // setCurrentContinent(gameByIdJsonData.continent);
    };

    const submitGuess = async (guess) => {
        if(currentGame.complete === true || newGameMessage.currentScore === newGameMessage.maxScore){
            return 
        }
        const response = await fetch (`${SERVER_URL}/games/${currentGame.id}`, {
            method: "PUT",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({countryName: guess})
        })
        const data = await response.json();
        setNewGameMessage(data);
        fetchSpecificGame(currentGame.id).then((gameByIdJsonData)=>{
            setCurrentGame(gameByIdJsonData);
        })

    }

    // const selectPlayer = async (userId) => {
    //     const response = await fetch(`${SERVER_URL}/users/${userId}`);
    //     const jsonData = await response.json();
    //     setCurrentPlayer(jsonData);
    // }

    return ( 
        <div className="main_container">
            <div className="header_left"></div>
            <div className="header_right">
                <SelectPlayerButton allPlayersList={allPlayersList} player={currentPlayer} fetchSelectedPlayer={fetchSelectedPlayer}/>
            </div>
            <div className="main_left">
                {currentGame ? <><Form submitGuess={submitGuess}/><CurrentGameStats newGameMessage={newGameMessage}/></> 
                    : <NewGameButton currentPlayer={currentPlayer} createNewGameOnDbSideAndSetNewGameMessage={createNewGameOnDbSideAndSetNewGameMessage}/>}
            </div>
            <div className="main_right">
                <NewGameButton currentPlayer={currentPlayer} createNewGameOnDbSideAndSetNewGameMessage={createNewGameOnDbSideAndSetNewGameMessage}/>
                <br/><br/>
                <MapChart topologyUrl={topologyUrl}/>
            </div>
            
        </div>
     );
}
 
export default MainContainer;