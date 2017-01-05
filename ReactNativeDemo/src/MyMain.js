import React, { Component} from 'react';
import {
 AppRegistry,
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  DrawerLayoutAndroid,
  ActivityIndicator,
  TextInput,
  ScrollView,
  ListView,
  Navigator,
  ToolbarAndroid,
  TouchableHighlight,
  Alert,
  ToastAndroid,
} from 'react-native';


class PropsComponent extends Component {
  render(){
    var defaultProps = {text:"默认"};
    return (<Text style={styles.red}>Hello {this.props.text}!</Text>);
  }
}

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}

class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
        />
      </View>
    );
  }

  _renderItem(rowData, sectionID, rowID){
    return(
        <TouchableHighlight onPress={() => this._onPressItem(rowData)}>
          <Text style={{padding:10}}>{"data:" + rowData +" rowId:"+ rowID + "sectionId:" + sectionID}</Text>
        </TouchableHighlight>
    );
  }

  _onPressItem(rowData){
    ToastAndroid.show(rowData, ToastAndroid.SHORT);
  }

}

export default class MyScene extends Component {
  
  render() {
  	let url = {uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
    
    return (
    	<View>
    		<ActivityIndicator />
	        <ScrollView>

	          <View>
	            <TouchableHighlight 
	              style={styles.button}  
	              underlayColor={'steelblue'} 
	              activeOpacity={0.5} 
	              onPress={()=> {
	                    Alert.alert(
	                        `你点击了按钮`,
	                        'Hello World！',
	                        [
	                            {text: '以后再说', onPress: () => console.log('Ask me later pressed')},
	                            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
	                            {text: '确定', onPress: () => console.log('OK Pressed')},
	                        ]
	                    )
	                }}>
	              <Text>Button</Text>
	            </TouchableHighlight>
	          </View>

	          <Image source={url} style={{width:100, height:100}}/>

	        <View style={[styles.align]}>
	          <PropsComponent text="张三"/>
	          <PropsComponent text="李四"/>
	          <PropsComponent text="小邓"/>
	          <PropsComponent />
	        </View>

	        <View style={{
	              flex: 1, 
	              flexDirection:'row',
	              justifyContent:'flex-start'
	            }}>
	            <View style={{width:50, height:50, backgroundColor: 'powderblue'}} />
	            <View style={{width:50, height:50, backgroundColor: 'skyblue'}} />
	            <View style={{width:50, height:50, backgroundColor: 'steelblue'}} />
	          </View>

	          <View style={{
	              flex: 1, 
	              flexDirection:'row',
	              justifyContent:'center'
	            }}>
	            <View style={{width:50, height:50, backgroundColor: 'powderblue'}} />
	            <View style={{width:50, height:50, backgroundColor: 'skyblue'}} />
	            <View style={{width:50, height:50, backgroundColor: 'steelblue'}} />
	          </View>

	          <View style={{
	              flex: 1, 
	              flexDirection:'row',
	              justifyContent:'flex-end'
	            }}>
	            <View style={{width:50, height:50, backgroundColor: 'powderblue'}} />
	            <View style={{width:50, height:50, backgroundColor: 'skyblue'}} />
	            <View style={{width:50, height:50, backgroundColor: 'steelblue'}} />
	          </View>

	          <View>
	          <PizzaTranslator/>
	          <ListViewBasics/>
	          </View>

	        </ScrollView>
    	</View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  red:{
    color:'red'
  },
  white:{
    color:'white'
  },
  align:{
    alignItems:'flex-end'
  },
  flex:{
    flex:1
  },
  toolbar:{
    height:50,
    backgroundColor: 'steelblue'
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:150,
    backgroundColor:'skyblue',
    borderRadius:5
  },
  container: {
        flex: 1
    },
});