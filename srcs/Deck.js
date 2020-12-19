import React,{useRef,useState} from 'react';
import { View, Text, Animated,PanResponder,Dimensions,StyleSheet} from 'react-native';


const {width}=Dimensions.get('screen');
const SWIPE_ACTIVE=width/2;


const Deck = ({data,renderCard,onSwipeLeft,onSwipeRight}) => {

    const position=useRef(new Animated.ValueXY()).current;
    const [indexActive,setIndexActive]=useState(0);
    const panResponder=useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderMove:(event,gesture)=>{
           position.setValue({x:gesture.dx,y:gesture.dy});
        },
        onPanResponderRelease:(event,gesture)=>{
           if(gesture.dx>SWIPE_ACTIVE){
                swipe('right');
            }else if(gesture.dx<-SWIPE_ACTIVE){
               swipe('left');
            }else{
                resetPosition();
            }

           
        }
                    })).current;

    function onSwipeRight(){}
    function onSwipeLeft(){}


    function getCardStyle(){
        const rotate=position.x.interpolate({
            inputRange:[-width*2,0,width*2],
            outputRange:["-120deg","0deg","120deg"]
        });
        return {
            ...position.getLayout(),
            transform:[{rotate}]
        };
    }
    
    function resetPosition(){
        Animated.spring(position,{
            toValue:({x: 0, y:0}),
            useNativeDriver:false
        }).start();
    }

    function swipe(direction){
        let swipeVal=direction==='right' ? width*1.5 : -width*1.5;
        Animated.timing(position,{
            toValue:{x:swipeVal,y:0},
            duration:400,
            useNativeDriver:false
        }).start(()=>{
            onSwipeComplete(direction);
        });
    }

    function onSwipeComplete(direction){
        const item=data[indexActive];
        direction==="right" ? onSwipeRight(item):onSwipeLeft(item);
        position.setValue({x:0,y:0});
        setIndexActive(indexActive=>indexActive+1);
    }

    return (
    <View>
            {indexActive >= data.length? <Text style={{marginTop:100,
            width,
            textAlign:'center',
            fontWeight:'bold',
            fontSize:30}}>There is no more data</Text>
            :data.map((item,index)=>{   
                    if(index===indexActive){  
                        return( 
                        <Animated.View key={item.id} {...panResponder.panHandlers} 
                        style={[getCardStyle(),styles.cardStyle]} >
                            {renderCard(item)}
                        </Animated.View>);
                    }else if(index<indexActive){
                        return null;
                    }
                 return (
                    <View key={item.id} style={[styles.cardStyle,{zIndex:-100}]}>
                     {renderCard(item)}
                     </View>);
                }).reverse()
          }
    </View>
    )
}

export default Deck;

const styles=StyleSheet.create({
        cardStyle:{
            position:'absolute',
            width,
            marginTop:25
        }
});
