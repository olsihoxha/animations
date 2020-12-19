import React,{useState} from 'react';
import { StyleSheet, Text, View ,StatusBar,Animated } from 'react-native';
import AnimationTab from './Animations/AnimationTab';
import Progress from './Animations/ProgressIt';
import Deck from './srcs/Deck';
import {Card,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://images.pexels.com/photos/6144452/pexels-photo-6144452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 2, text: 'Card #2', uri: 'https://images.pexels.com/photos/3739943/pexels-photo-3739943.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
  { id: 3, text: 'Card #3', uri: 'https://images.pexels.com/photos/2782093/pexels-photo-2782093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 4, text: 'Card #4', uri: 'https://images.pexels.com/photos/2801621/pexels-photo-2801621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 5, text: 'Card #5', uri: 'https://images.pexels.com/photos/2782093/pexels-photo-2782093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 6, text: 'Card #6', uri: 'https://images.pexels.com/photos/3739943/pexels-photo-3739943.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
  { id: 7, text: 'Card #7', uri: 'https://images.pexels.com/photos/6144452/pexels-photo-6144452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 8, text: 'Card #8', uri: 'https://images.pexels.com/photos/2801621/pexels-photo-2801621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
];

export default function App() {

  ///This is for Progress animation
  // const [index,setIndex]=useState(0);

  // React.useEffect(()=>{
  //   const interval=setInterval(()=>{
  //     setIndex((index+1) % (10 + 1) );
  //   },500);
  
  //   return ()=>{
  //     clearInterval(interval);
  //   };
  // },[index]);
  /////


function renderCard(item){
      return(
        <Card key={item.id+"a"}>
          <Card.Title>{item.text}</Card.Title>
          <Card.Image source={{uri:item.uri}}></Card.Image>
          <Text style={{marginBottom:20}}>This is a random description</Text>
          <Button
           icon={
            <Icon
              name="heart"
              size={15}
              color="white"
            />
          }
          title="Share Love"
          />
        </Card>
      );
    }

  return (
    <Deck data={DATA} renderCard={renderCard}/>
  );
}
