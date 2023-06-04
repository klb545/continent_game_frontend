
import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
// import { green, pink, purple, blue } from '@mui/material/colors';

import usericon from '../images/user-computer-icons-apple-icon-image-format-business-person-icon-png-human-male-man-people-3b847a39523c874ea3506e86eb09f6ea.png';


function SimpleDialog({ onClose, selectedValue, open, allPlayersList, fetchSelectedPlayer }) {

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value, selectedUserId) => {
    onClose(value);
    fetchSelectedPlayer(selectedUserId)
  };

  return (
    <Dialog onClose={handleClose} open={open} style={{position: "fixed", display: "flex", justifyContent: "center", width: "119%"}}>
      <DialogTitle style={{backgroundColor:"rgb(12, 27, 35)", color: "white"}}><strong>Select Player</strong></DialogTitle>
      <List sx={{ pt: 0 }} style={{backgroundColor:"rgb(21, 42, 54)", color: "white"}}>
        {allPlayersList.map((player) => (
            <ListItem disableGutters key={player.id} className="user_list_item">
                    <ListItemButton onClick={() => handleListItemClick(player.name, player.id)} key={player.id}>
                        <ListItemAvatar>
                            {player.id == 4 ? <Avatar sx={{ bgcolor: "#A665C6", color: "black" }}><PersonIcon /></Avatar>
                                : player.id == 2 ? <Avatar sx={{ bgcolor: "rgb(242, 61, 188)", color: "black" }}><PersonIcon /></Avatar>
                                : player.id == 3 ? <Avatar sx={{ bgcolor: "rgb(173,255,48)", color: "black" }}><PersonIcon /></Avatar>
                                : <Avatar sx={{ bgcolor: "rgb(68,227,255)", color: "black" }}><PersonIcon /></Avatar>
                            }
                        </ListItemAvatar> 
                        <ListItemText primary={player.name} />
                    </ListItemButton>
            </ListItem>
        ))}
      </List>
    </Dialog>
  );
}


const SelectPlayerButton = ({allPlayersList, player, fetchSelectedPlayer}) => {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(player.name);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
    return ( 
        <div className="add-new-chatroom" style={{textAlign: "right", padding: "10px"}}>
            {/* <h2>Selected user: &emsp; {user.name}</h2> */}
                    {/* <br /> */}
                    {/* <Button variant="contained" onClick={handleClickOpen}>
                        Open simple dialog
                    </Button> */}
            <label htmlFor="select-user-button">
                Select Player<br/>
            </label>
            <button id="select-user-button" onClick={handleClickOpen} style={{height: "65px", width: "65px"}}>
                    <img src={usericon} style={{width: "40px", filter: "invert(0.8)"}}/>
            </button>
            {player ? 
                <Typography variant="subtitle1" component="div">
                        Selected: {selectedValue}
                </Typography> : null
            }
                <br/><br/>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                allPlayersList={allPlayersList}
                fetchSelectedPlayer={fetchSelectedPlayer}
            />
        </div>
     );
}
 
export default SelectPlayerButton;
