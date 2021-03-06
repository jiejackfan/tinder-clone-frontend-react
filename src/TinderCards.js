import React, {useState, useEffect} from 'react';
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import axios from "./axios"

function TinderCards() {
    const [people, setPeople] = useState([]);

    // componentDidMount()
    //  [], when TinderCard loads,run only once
    useEffect(()=>{
        async function fetchData() {
            const req = await axios.get('/tinder/cards');
            setPeople(req.data);
        }

        fetchData();
    },[]);

    console.log(people)

    const swiped = (direction, nameToDelete) => {
        console.log("Deleting " + nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + " left the screen");
    }

    return (
        <div className="tinderCards">
            <div className="tinderCards_cardContainer">
                {people.map(person=>(
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={["up","down"]}
                        onSwipe={(dir)=>swiped(dir, person.name)}
                        onCardLeftScreen = {()=>outOfFrame(person.name)}
                    >
                        <div
                            style={{backgroundImage: `url(${person.imgUrl})`}}
                            className="card"
                        >
                            <h3>
                                {person.name}
                            </h3>    
                        </div>
                        
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards