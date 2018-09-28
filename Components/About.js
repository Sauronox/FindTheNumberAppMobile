import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity} from 'react-native';
class About extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titleCreator}>Creator of the application :</Text>
                <Text style={styles.textCreator}>Alan </Text>
                <Text style={styles.textCreator}>Theo </Text>
                <Text style={styles.textCreator}>Ryad </Text>
                <Text style={styles.textCreator}>Quentin </Text>
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
        fontSize:30,
    }
})
export default About;