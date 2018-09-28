import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux'

class LogGame extends React.Component{
    constructor(props) {
        super(props)
        this.id
        this.state ={
        }
    }
    componentDidMount() {
        this.id = 0
    }
    render(){
        let i = 0
        // console.log(this.props) 
        return(
            <View style={styles.container}>
                <Text style={styles.titleCreator}>History :</Text>
                <FlatList
                    data={this.props.ScoreGame}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Text style={styles.textCreator}>Found {item.value} | {item.attempts}x | {item.time}s</Text>}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleCreator:{
        fontSize:30,
        fontWeight: 'bold',
    },
    textCreator:{
        fontSize:26,
    }
})
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(LogGame);