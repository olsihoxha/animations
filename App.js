import React,{useState} from 'react';
import { StyleSheet, Text, View ,StatusBar,Animated } from 'react-native';

const Progress=({step,steps,height})=>{

  const animatedValue=React.useRef(new Animated.Value(-1000)).current;
  const reactive=React.useRef(new Animated.Value(-1000)).current;
  const [width,setWidth]=useState(0);

  React.useEffect(()=>{
    Animated.timing(animatedValue,
      {
        toValue:reactive,
        duration:300,
        useNativeDriver:true,
      }
      ).start();
  },[]);

  React.useEffect(()=>{
    reactive.setValue(-width + width * step/steps);
  },[step,width])

  return(
    <View>
    <Text style={{
      fontSize:12,
      fontWeight: 'bold',
      marginBottom:4,
    }}>
    {step}/{steps}
    </Text>
    <View 
    onLayout={e=>{
      const newWidth=e.nativeEvent.layout.width;
      setWidth(newWidth);
    }}
    style={{
      height,
      backgroundColor:"rgba(0,0,0,0.1)",
      borderRadius:height,
      overflow:"hidden",
    }}>
      <Animated.View
        style={{
          height,
          width:'100%',
          borderRadius:height,
          backgroundColor:"pink",
          position:'absolute',
          top:0,
          left:0,
          transform:[{
            translateX:animatedValue
          }]
        }}
      />
    </View>
    </View>
  )
};

export default function App() {
  const [index,setIndex]=useState(0);

  React.useEffect(()=>{
    const interval=setInterval(()=>{
      setIndex((index+1) % (10 + 1) );
    },500);
  
    return ()=>{
      clearInterval(interval);
    };
  },[index]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
     <Progress step={index} steps={10} height={20}/>
    </View>
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