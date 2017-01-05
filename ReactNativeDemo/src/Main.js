'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  Dimensions,
  BackAndroid,
  ToastAndroid
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

const MyMainText = "我的主页";
const MyMessageText = "我的信息";
const MyDetailText = "详情";

const Image_Main_Nomal = require('./drawables/my_main_nomal.png');
const Image_Main_Seledted = require('./drawables/my_main_selected.png');
const Image_Message_Nomal = require('./drawables/my_message_nomal.png');
const Image_Message_Seledted = require('./drawables/my_message_selected.png');
const Image_Detail_Nomal = require('./drawables/my_detail_nomal.png');
const Image_Detail_Seledted = require('./drawables/my_detail_selected.png');

import MyMain from './MyMain';
import MyMessage from './MyMessage';
import MyDetail from './MyDetail';

var lastTime = 0;
const EXIT = '再按一次退出';

export default class ReactNativeDemo extends Component {

  constructor(props){
    super(props);
    this.state = {selectedTab:MyMainText};
    this._renderTabItem =  this._renderTabItem.bind(this);
    this.handleBack = this.handleBack.bind(this);

  }

  handleBack(){
    if(this.props.navigator == null){
        return false;
      }
      if(this.props.navigator.getCurrentRoutes().length === 1){
        var timestamp = (new Date()).valueOf();
        if(timestamp - lastTime > 2000){
        lastTime = timestamp;
        ToastAndroid.show(EXIT, ToastAndroid.SHORT);
        return true;
      }else{
      return false;
      }
    }
    this.props.navigator.pop();
    return true;
  }

  _renderTabItem(img, selectedImg, tag, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                title={tag}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

   _createChildView(tag) {
      let renderView;
      switch (tag) {
          case MyMainText:
              renderView = <MyMain />;
              break;
          case MyMessageText:
              renderView = <MyMessage />;
              break;
         case MyDetailText:
              renderView = <MyDetail />;
              break;
          default:
              break;
      }
      return (<View style={styles.container}>{renderView}</View>)
    }

  render() {
    let toolbarActions =[  
      {title: 'Settings', icon:require('./drawables/ic_menu_settings.png'), show: 'always'}, 
      {title: 'Others', icon:require('./drawables/ic_menu_more.png'), show: 'always'},   
    ];
    return (
      <DrawerLayoutAndroid
        renderNavigationView={() => 
          <View style={{
            flex: 1, 
            flexDirection:'column',
            justifyContent:'space-around'
          }}>
            <View style={{width:50, height:50, backgroundColor: 'powderblue'}} />
            <View style={{width:50, height:50, backgroundColor: 'skyblue'}} />
            <View style={{width:50, height:50, backgroundColor: 'steelblue'}} />
          </View>
        }>

        <ToolbarAndroid style={styles.toolbar}
          title="ReactNativeDemo"
          titleColor='white'
          actions={toolbarActions}
          navIcon={require('./drawables/ic_drawer_home.png')} />

        <View style={styles.container}>
          <TabNavigator>
            {this._renderTabItem(Image_Main_Nomal, Image_Main_Seledted, MyMainText, this._createChildView(MyMainText))}
            {this._renderTabItem(Image_Message_Nomal, Image_Message_Seledted, MyMessageText, this._createChildView(MyMessageText))}
            {this._renderTabItem(Image_Detail_Nomal, Image_Detail_Seledted, MyDetailText, this._createChildView(MyDetailText))}
          </TabNavigator>
        </View>
        
      </DrawerLayoutAndroid>
    );
  }

  /**
  *用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误
  */
  componentDidMount(){
    //ToastAndroid.show('componentDidMount', ToastAndroid.SHORT);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  /**
  *销毁期，用于清理一些无用的内容，如：点击事件Listener
  */
  componentWillUnmount(){
    //ToastAndroid.show('componentWillUnmount', ToastAndroid.SHORT);
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  toolbar:{
  height:50,
  backgroundColor: 'steelblue'
  },
  tabNav: {
      height: 60,
      backgroundColor: '#FFF',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderTopColor: '#E8E8E8'
  },
  tabNavHide: {
      position: 'absolute',
      top: Dimensions.get('window').height,
      height: 0
  },
  webview_style:{
     backgroundColor:'#00ff00',
  },
  tab: {
      height: 60,
      backgroundColor: '#303030',
      alignItems: 'center',
  },
  tabIcon: {
      width: 30,
      height: 30,
      resizeMode: 'stretch',
      marginTop: 12.5
  },
});

