import React,{useState,useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import { Container, CircularProgress } from '@material-ui/core';
import Tile from "./Tile";
import {getTeams} from "../../api";

const useStyles = makeStyles(()=>({
    teamsContainer:{
        padding:10,
        display:"flex",
        justifyContent:"space-evenly",
        alignItems: "center",
        flexWrap:"wrap"
    }
}));

const Home = () => {
    const [teams,setTeams] = useState([]);

    useEffect(()=>{
        const wrapper = async()=>{
            const data = await getTeams();
            setTeams(data);
        };
        wrapper();
    },[]);

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.teamsContainer}>
           {
               teams.length ? ( 
                   teams.map((team,index)=>(
                    <Tile team={team} key={index} />
                ))) : <h3><CircularProgress /></h3>
           }
        </Container>
    )
}

export default Home
