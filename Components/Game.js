import React from 'react';
import { StyleSheet, Text, View,TextInput,Image, TouchableOpacity, Vibration,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux'
class Game extends React.Component{

    // ------------------------------
    // Function Surcharge
    
    constructor(props) {
        super(props)
        this.numberRandom
        this.id = 0
        this.timer
        this.state ={
            messageResult: "",
            tentative: 0,
            resetButton: "Reset",
            inputSearch: "",
            displayButtonReset: false,
            displayButtonSubmit: true,
            displayTextinput: true,
            chrono: 0,
        }
    }

    componentDidMount() {
        console.log("Component FilmDetail monté")
        this.numberRandom = this.generated()
    }
    componentDidUpdate(){

    }
    // ------------------------------
    // Function Costum

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    generated() {
        let random = this.getRandomInt(100)
        return random
    }
    getValidValue(){
        Vibration.vibrate(200)
        console.log('numberPlayer : ',this.state.inputSearch)
        console.log('numberRandom : ',this.numberRandom)
        if(this.state.inputSearch > this.numberRandom){
            this.setState({messageResult:"Smallest"})
            this.setState({tentative:this.state.tentative+=1})
        }else if(this.state.inputSearch < this.numberRandom){
            this.setState({messageResult:"Larger"})
            this.setState({tentative:this.state.tentative+=1})
        }else if(this.state.inputSearch == this.numberRandom){
            this.setState({messageResult:"You win"})
            this.setState({resetButton:"Retry"})
            clearInterval(this.timer)
            this.setState({displayButtonReset:true})
            this.setState({displayButtonSubmit:false})
            this.setState({displayTextinput:false})
            this.pushNewScore()
        }else{

        }
        this.setState({inputSearch: ""})
        console.log('messageresult : ',this.state.messageResult)
    }
    getValue(value){
        console.log('If number ',/[0-9]/.test(value))
        console.log('inputSearch :',this.state.inputSearch)
        console.log('Value :',value)
        this.setState({inputSearch: value})
        if(/[0-9]/.test(value.substring(value.length-1)) == true){
            this.setState({inputSearch: value})
        }else{
            let searchIndexStr = value.substring(value.length-1)
            console.log('Replace element to remove number :',this.state.inputSearch.replace(searchIndexStr,''))
            let newValue = this.state.inputSearch.replace(searchIndexStr,'')
            this.setState({inputSearch: newValue})
            // this.setState({inputSearch: ""})
        }
        if(this.timer == undefined || this.timer == null){
            this.timer = setInterval(() => {
                this.setState({chrono:this.state.chrono+=1})
            }, 1000);
        }
    }
    resetGame(){
            this.setState({displayButtonReset:false})
            this.setState({inputSearch: ""})
            this.setState({messageResult:""})
            this.timer = undefined;
            this.setState({chrono:0})
            this.setState({tentative:0})
            this.numberRandom = this.generated();
            this.setState({resetButton:"Reset"})
            this.setState({displayButtonSubmit:true})
            this.setState({displayTextinput:true})
    }

    pushNewScore() {
        const action = { type: "NEW_SCORE", value: this.state = {value:this.state.inputSearch,attempts:this.state.tentative,id:this.id,time:this.state.chrono} }
        this.props.dispatch(action)
        this.id = this.id+=1
    }

    render(){
        console.log(this.props) 
        return(
            <View style={styles.main_container}>

                <View style={styles.play_container}>

                    <Text style={styles.TitleGame}>Find the Number</Text>

                    <Text style={styles.txtResult}>{this.state.messageResult}</Text>

                    {this.state.displayTextinput == true?
                        <View style={styles.InputButton}>
                            <TextInput
                                id="inputNumber"
                                style={styles.inputValueGame}
                                value={this.state.inputSearch}
                                placeholder="enter value"
                                keyboardType="numeric"
                                maxLength={3} 
                                underlineColorAndroid='transparent'
                                onChangeText={(number) => this.getValue(number)}
                            />
                            <TouchableOpacity
                                style={styles.buttonInInput}
                                onPress={()=> this.getValidValue()}
                            >
                                <Image source={{uri: 'https://cdn0.iconfinder.com/data/icons/website-kit-2/512/icon_403-512.png'}}
                                       style={{width: 30, height: 30}} />
                            </TouchableOpacity>
                        </View>
                        : console.log()
                    }

                    {this.state.displayButtonReset == true?
                        <TouchableOpacity
                            style={styles.button}
                             onPress={()=> this.resetGame()}
                        >
                            <Text style={styles.txtButtonSubmit}> {this.state.resetButton} </Text>
                        </TouchableOpacity>
                    : console.log('')
                    }

                    <View style={styles.containerStat}>
                        <View style={styles.attempStat}>
                            <Text style={{color: '#ffffff'}}>{this.state.tentative}x</Text>
                        </View>
                        <View style={styles.timerStat}>
                            <Text style={{color: '#ffffff'}}>{this.state.chrono}s</Text>
                        </View>
                    </View>

                </View>

                <TouchableOpacity
                    style={styles.buttonAbout}
                    onPress={()=> this.props.navigation.navigate("About")}
                >
                     <Text style={styles.txtButtonAbout}> ABOUT </Text>
                </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    main_container: {
    //   height: 190,
      flex: 1,
      marginTop: 20,
      marginBottom: 10,
    //   marginTop: 40
    },
    play_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'bottom',
    },
    TitleGame: {
        fontSize :25
    },
    player_element: {
        width: 200,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: 'blue',
        margin: 5
    },
    InputButton:{
        flex:0,
        flexDirection: 'row',
        margin: 5,
        height: 50,
    },
    inputValueGame:{
        marginLeft: 50,
        height: 50,
        borderBottomLeftRadius: 55,
        borderTopLeftRadius: 55,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10, 
        textAlign:'center',
        color: 'black',
        fontSize: 20,
        flex:3
    },
    buttonInInput : {
        marginRight: 50,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomRightRadius: 55,
        borderTopRightRadius: 55,
        borderWidth: 0.5,
        borderColor: 'grey',
        padding: 5, 
        backgroundColor: 'grey',
    },
    button:{
        width:150,
        borderRadius: 55,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 5, 
        margin: 5,
        backgroundColor: '#368edb',
    },
    buttonAbout:{
        flex:0,
        borderWidth: 0.5,
        borderColor: 'white',
        padding: 20, 
        backgroundColor: 'white',
    },
    txtButtonSubmit: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    txtButtonAbout: {
        color: 'black',
        textAlign: 'center',

        fontSize: 20
    },
    txtResult: {
        // borderRadius: 50,
        // borderWidth: 1,
        // borderColor: 'red',
        // padding: 10,
        color: '#979ca3',
    },
    containerStat: {
        flex:2,
        flexDirection: 'row',
        margin: 5,
        height: 50,
    },
    attempStat:{
        flex:1,
        height: 50,
        width: 55,
        borderBottomLeftRadius: 55,
        borderTopLeftRadius: 55,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        marginLeft: 50,
        textAlign:'center',
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerStat:{
        flex:1,
        height: 50,
        width: 50,
        borderBottomRightRadius: 55,
        borderTopRightRadius: 55,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        marginRight: 50,
        textAlign:'center',
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);