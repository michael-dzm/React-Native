'use strict';

import React, { Component} from 'react';
import { 
	AppRegistry,
	StyleSheet,
	View, 
	Text,
	Navigator,
	ViewPagerAndroid,
	Image,
	TouchableHighlight,
	BackAndroid,
	ToastAndroid
} from 'react-native';

import Login from './Login';
import Main from './Main';

var _navigator;
var lastTime = 0;
const EXIT = '再按一次退出';

export default class ReactNativeDemo extends Component {

	constructor(){
		super();
	}

	_renderScene(route, navigator){
		_navigator = navigator;
		switch(route.id){
			case 'welcome':
				return(<ViewPagerComponent navigator={_navigator} route={route} />);
			case 'login':
				return(<Login navigator={_navigator} route={route} />);
			case 'main':
				return(<Main navigator={_navigator} route={route} />);
		}
	}
  
  render() {
  	let renderScene = this._renderScene;
    return (     
      <Navigator
      	initialRoute={{id:'welcome'}}
      	renderScene={renderScene}
      	configureScene={(route) => {
  			var conf = Navigator.SceneConfigs.FadeAndroid;
  			conf.gestures = null;
  			return conf;
		}}
      />
    )
  }

  /**
	*实例化时候调用，以后不再调用，初始化固定值，以后不再变，如静态的数据源。
	*/
  	// getDefaultProps(){
  	//    return;
  	// }

   	/**
   	*初始化状态值，用于改变组件状态。
   	*/
  	//  getInitialState(){
  	//   return;
  	// }

  	/**
  	*组件将要被加载在视图
  	*/
  	componentWillMount(){

  	}

	/**
	*用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误
	*/
  	componentDidMount(){}

  	/**
  	*指父元素对组件的props或state进行了修改
  	*/
  	componentWillReceiveProps(){}

  	/**
  	*一般用于优化，可以返回false或true来控制是否进行渲染
  	*/
  	shouldComponentUpdate(){
  		return true;
  	}

 	/**
 	*组件刷新前调用，类似componentWillMount
 	*/
  	componentWillUpdate(){}

  	/**
  	*更新后的hook
  	*/
 	componentDidUpdate(){}

  	/**
  	*销毁期，用于清理一些无用的内容，如：点击事件Listener
  	*/
 	componentWillUnmount(){}
}

class ViewPagerComponent extends Component {
	render(){
		return(
			<ViewPagerAndroid initialPage={0} style={styles.viewPager}>
				<View style={styles.pageStyle}>
					<Image source={require('./drawables/guide1.png')} style={styles.imageStyle}/>
				</View>
				<View style={styles.pageStyle}>
					<Image source={require('./drawables/guide2.png')} style={styles.imageStyle}/>
				</View>
				<View style={styles.pageStyle}>
					<Image source={require('./drawables/guide3.png')} style={styles.imageStyle}>
						<TouchableHighlight 
			              style={styles.buttonStyle}  
			              underlayColor={'steelblue'} 
			              activeOpacity={0.5} 
			              onPress={() => {
			              	this.props.navigator.replacePrevious({id:'login'});
			              }}>
		              		<Text>开启React Native之旅</Text>
		            	</TouchableHighlight>
	            	</Image>
				</View>
			</ViewPagerAndroid>
			);
	}

}

const styles = StyleSheet.create({
   viewPager: {
     flex: 1,
     backgroundColor: '#F5FCFF',
   },
   pageStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
     position:'relative',
  },
   imageStyle: {
   	flex:1,
   	alignItems:'center',
    justifyContent: 'flex-end',
  },
  buttonStyle:{
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:200,
    backgroundColor:'skyblue',
    borderRadius:5,
    marginBottom:80
  },
 });

 AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);