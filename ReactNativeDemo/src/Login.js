import React, { Component} from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TextInput,
	TouchableHighlight,
} from 'react-native';

export default class MyScene extends Component {
  
  constructor(props){
  	super(props);
  	this.state = {account:'', password:''};
  }

  //获取登录站点
  getStations(account){
    return fetch('http://www.dzgas.net:8671/anjian/v1/mobile/stations/account/' + account, {
            method:'POST'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              if(responseJson.statusCode === 200){
                return responseJson.data;
              }
              return null;
            })
            .catch((error) => {
              console.error(error);
            })
            .done();
  }

  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.textStyle}>React Native Study Demo</Text>
        <TextInput
          autoFocus={true}
          multiline={false}
          style={[styles.inputStyle,styles.marginTop]}
          placeholder="请输入用户名"
          onChangeText={(account) => this.setState({account})}/>
        <TextInput
          multiline={false}
          secureTextEntry={true}
          style={styles.inputStyle}
          placeholder="请输入密码"
          onChangeText={(password) => this.setState({password})}/>
        <TouchableHighlight 
          style={[styles.buttonStyle, styles.marginTop]}  
          underlayColor={'steelblue'} 
          activeOpacity={0.5} 
          onPress={() => {
            alert(JSON.stringify(this.getStations(this.state.account)));
          	//this.props.navigator.replacePrevious({id:'main'});
          }}>
      		<Text>登录</Text>
    	</TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center'
	},
	textStyle:{
		textAlign:'center',
		fontSize:18,
		fontStyle:'italic',
		fontWeight:('bold', '300'),
		textShadowOffset:{width:2, height:2},
		textShadowColor:'black',
		textShadowRadius:3
	},
	inputStyle:{
		height:50,
		marginLeft:40,
		marginRight:40
	},
	buttonStyle:{
	    alignItems:'center',
	    justifyContent:'center',
	    height:40,
		marginLeft:50,
		marginRight:50,
	    backgroundColor:'skyblue',
	    borderRadius:10
  	},
  	marginTop:{
  		marginTop:20
  	}
});