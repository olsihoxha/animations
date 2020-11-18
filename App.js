import React,{useState} from 'react';
import { StyleSheet, Text, View ,StatusBar,Animated } from 'react-native';
import AnimationTab from './Animations/AnimationTab';
import Progress from './Animations/ProgressIt';



export default function App() {

  ///This is for Progress animation
  const [index,setIndex]=useState(0);

  React.useEffect(()=>{
    const interval=setInterval(()=>{
      setIndex((index+1) % (10 + 1) );
    },500);
  
    return ()=>{
      clearInterval(interval);
    };
  },[index]);
  /////


  return (
    <AnimationTab/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});