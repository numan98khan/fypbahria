import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  LayoutAnimation,
  Modal,
  StatusBar,
} from 'react-native';
import {BackHandler} from 'react-native'
import {WebView} from 'react-native-webview';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import {NodeCameraView, NodePlayerView} from 'react-native-nodemediaclient';
import SocketUtils from './SocketUtils';
import LiveStatus from './LiveStatus';
import Utils from './Utils';
import FloatingHearts from './FloatingHearts';
import Draggable from './Draggable';
import styles from './styles';

import { Snackbar, Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, 
        toggleFilter, updateScreenVar,
      toggleSearch , initiatespecials, 
      cartFunction } from '../../state/actions';

import { ListItem, Icon } from 'react-native-elements'
import { Drawer } from 'react-native-paper';

class LiveStreamScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      liveStatus: LiveStatus.REGISTER,
      countViewer: 0,
      countHeart: 0,
      message: '',
      cameraId: 0,
      visibleListMessages: true,
      listMessages: [
        // {
        //   userId: 'user1',
        //   message: 'Link for info about product 1',
        //   productId: 1,
        //   productImageUrl:
        //     'https://cf.shopee.vn/file/3c18ee889c242196030a86b7ce86a59e_tn',
        //   productUrl:
        //     'https://shopee.vn/Áo-sơ-mi-lụa-dài-tay-kẻ-sọc-nam-…-style-Hàn-Quốc-MỚI-(7-màu)-i.12260860.1025065219'
        // }
      ],
      dropZoneCoordinates: null,
      keyboardHeight: 0,
      productId: null,
      productUrl: null,
      productImageUrl: null,
      modalVisible: false,
      inputHeight: 40,
      visible: false,
      snackVisible: false,
      active: 'first',
      liveProducts: [],
    };
    this.Animation = new Animated.Value(0);
    this.scrollView = null;
  }

  _onToggleSnackBar = () => this.setState(state => ({ snackVisible: !state.snackVisible }));
  // _onToggleSnackBar = () => console.log('Snack Bar Toggled!!!');
  _onDismissSnackBar = () => this.setState({ snackVisible: false });

  _showDialog = () => this.setState({ visible: !this.state.visible });

  _hideDialog = () => this.setState({ visible: false });

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  handleBackButton() {
    return true;
  }

  componentDidMount = () => {
    console.log('componentDidMount')

    if (this.props.products.appMode === 'buyer'){
      this.liveProducts()
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    let keyboardShowEvent = 'keyboardWillShow';
    let keyboardHideEvent = 'keyboardWillHide';

    if (Platform.OS === 'android') {
      keyboardShowEvent = 'keyboardDidShow';
      keyboardHideEvent = 'keyboardDidHide';
    }
    this.keyboardShowListener = Keyboard.addListener(keyboardShowEvent, e =>
      this.keyboardShow(e),
    );
    this.keyboardHideListener = Keyboard.addListener(keyboardHideEvent, e =>
      this.keyboardHide(e),
    );

    Utils.setContainer(this);
    // const userType = Utils.getUserType();
    const userType = 'STREAMER';
    

    if (userType === 'STREAMER') {
      this.setState({liveStatus: LiveStatus.REGISTER});
      SocketUtils.emitRegisterLiveStream(Utils.getUserId(), Utils.getUserId());
      // SocketUtils.emitRegisterLiveStream(this.props.products.userObj.email, this.props.products.userObj.uid);
      console.log('LIVE STREAM REGISTERED!!!!!')
    } else if (userType === 'VIEWER') {
      SocketUtils.emitJoinServer(Utils.getRoomName(), Utils.getUserId());
      this.StartBackgroundColorAnimation();
    } else if (userType === 'REPLAY') {
      SocketUtils.emitReplay(Utils.getRoomName(), Utils.getUserId());
    }
  };

  alertStreamerNotReady = () => {
    return Alert.alert('Alert', 'Streamer not ready to live stream yet', [
      {
        text: 'Close',
        onPress: () => {
          SocketUtils.emitLeaveServer(Utils.getRoomName(), Utils.getUserId());
          this.props.navigation.goBack();
        },
      },
    ]);
  };

  keyboardShow(e) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    });
  }

  keyboardHide(e) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      keyboardHeight: 0,
    });
  }

  StartBackgroundColorAnimation = () => {
    this.Animation.setValue(0);

    Animated.timing(this.Animation, {
      toValue: 1,
      duration: 15000,
    }).start(() => {
      this.StartBackgroundColorAnimation();
    });
  };

  onBeginLiveStream = () => {
    this.setState({liveStatus: LiveStatus.ON_LIVE});
    SocketUtils.emitBeginLiveStream(Utils.getRoomName(), Utils.getUserId(), this.props.products.userObj.email);
    this.vbCamera.start();
    // this.vbCamera.switchCamera();
    
  };

  onFinishLiveStream = () => {
    // this.setState({liveStatus: LiveStatus.FINISH});
    console.log('Live Stream Ended')
    this.setState({liveStatus: LiveStatus.REGISTER});
    SocketUtils.emitFinishLiveStream(Utils.getRoomName(), Utils.getUserId());
    this.vbCamera.stop();
  };

  onPressHeart = () => {
    this.setState({countHeart: this.state.countHeart + 1});
    SocketUtils.emitSendHeart(Utils.getRoomName());
  };

  onChangeMessageText = text => {
    this.setState({message: text});
  };

  onPressSend = () => {
    const {
      message,
      listMessages,
      productId,
      productImageUrl,
      productUrl,
    } = this.state;
    if (productId !== null && productUrl !== null && productImageUrl !== null) {
      this.setState({message: ''});
      Keyboard.dismiss();
      const newListMessages = listMessages.slice();
      newListMessages.push({
        userId: Utils.getUserId(),
        message,
        productId,
        productImageUrl,
        productUrl,
      });
      this.setState({
        listMessages: newListMessages,
        visibleListMessages: true,
        productId: null,
        productUrl: null,
        productImageUrl: null,
      });
      SocketUtils.emitSendMessage(
        Utils.getRoomName(),
        Utils.getUserId(),
        message,
        productId,
        productImageUrl,
        productUrl,
      );
    } else if (message !== '') {
      this.setState({message: ''});
      Keyboard.dismiss();
      const newListMessages = listMessages.slice();
      newListMessages.push({userId: Utils.getUserId(), message});
      this.setState({
        listMessages: newListMessages,
        visibleListMessages: true,
      });
      SocketUtils.emitSendMessage(
        Utils.getRoomName(),
        Utils.getUserId(),
        message,
      );
    }
  };

  onPressCloseModal = () => {
    this.setState({
      productId: null,
      productUrl: null,
      productImageUrl: null,
      modalVisible: false,
    });
  };

  onPressCancelViewer = () => {
    if (this.vbViewer !== null && this.vbViewer !== undefined) {
      this.vbViewer.stop();
    }
    SocketUtils.emitLeaveServer(Utils.getRoomName(), Utils.getUserId());
    this.props.navigation.goBack();
  };

  renderCancelViewerButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={this.onPressCancelViewer}>
        <Image
          source={require('../../assets/ico_cancel.png')}
          style={styles.iconCancel}
        />
      </TouchableOpacity>
    );
  };

  onPressCancelReplay = () => {
    Utils.clearTimeOutMessages();
    if (this.vbReplay !== null && this.vbReplay !== undefined) {
      this.vbReplay.stop();
    }
    SocketUtils.emitLeaveServer(Utils.getRoomName(), Utils.getUserId());
    this.props.navigation.goBack();
  };

  renderCancelReplayButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={this.onPressCancelReplay}>
        <Image
          source={require('../../assets/ico_cancel.png')}
          style={styles.iconCancel}
        />
      </TouchableOpacity>
    );
  };

  onPressCancelStreamer = () => {
    if (this.vbCamera !== null && this.vbCamera !== undefined) {
      this.vbCamera.stop();
    }
    const {liveStatus} = this.state;
    if (
      liveStatus === LiveStatus.REGISTER ||
      liveStatus === LiveStatus.ON_LIVE
    ) {
      return Alert.alert(
        'Alert',
        'Are you sure to discard your live stream, a lot people is watching right now.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Sure',
            onPress: () => {
              SocketUtils.emitCancelLiveStream(
                Utils.getRoomName(),
                Utils.getUserId(),
              );
              SocketUtils.emitLeaveServer(
                Utils.getRoomName(),
                Utils.getUserId(),
              );
              this.props.navigation.goBack();
            },
          },
        ],
      );
    }
    this.props.navigation.goBack();
  };

  renderCancelStreamerButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={this.onPressCancelStreamer}>
        <Image
          source={require('../../assets/ico_cancel.png')}
          style={styles.iconCancel}
        />
      </TouchableOpacity>
    );
  };

  renderLiveText = () => {
    const {liveStatus} = this.state;
    return (
      <View
        style={
          liveStatus === LiveStatus.ON_LIVE
            ? styles.wrapLiveText
            : styles.wrapNotLiveText
        }>
        <Text
          style={
            liveStatus === LiveStatus.ON_LIVE
              ? styles.liveText
              : styles.notLiveText
          }>
          LIVE
        </Text>
      </View>
    );
  };

  renderLiveProducts = () => {
    const {liveStatus} = this.state;
    return (
      <TouchableOpacity
                // style={styles.wrapIconSend}
                onPress={this._showDialog}
                // activeOpacity={0.6}>
                // <Image
                //   source={require('../../assets/ico_send.png')}
                //   style={styles.iconSend}
                // /
                style={{position: 'absolute',
        top: 30,
        left: 260,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'}}
                >
              
      <View
        // onPress={this._showDialog}
        // style={{position: 'absolute',
        // top: 30,
        // left: 260,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // paddingHorizontal: 8,
        // paddingVertical: 6,
        // borderRadius: 5,
        // height: 40,
        // justifyContent: 'center',
        // alignItems: 'center'}}
        >
        
        <Text
          style={
            liveStatus === LiveStatus.ON_LIVE
              ? styles.liveText
              : styles.notLiveText
          }>
          Products
        </Text>
      </View>
      </TouchableOpacity>
    );
  };

  setDropZoneValues = ({nativeEvent}) => {
    const layout = {
      y: nativeEvent.layout.y,
      width: nativeEvent.layout.width,
      x: nativeEvent.layout.x,
      height: nativeEvent.layout.height,
      keyboardHeight: this.state.keyboardHeight,
    };
    this.setState({
      dropZoneCoordinates: layout,
    });
  };

  onPressProduct = item => {
    this.setState({
      modalVisible: true,
      productId: item.id,
      productImageUrl: item.productImageUrl,
      productUrl: item.productUrl,
    });
  };

  onFinishDragProduct1 = () => {
    this.setState({
      message: 'Link for info about product 1',
      productId: 1,
      productImageUrl:
        'https://cf.shopee.vn/file/3c18ee889c242196030a86b7ce86a59e_tn',
      productUrl:
        'https://shopee.vn/Áo-sơ-mi-lụa-dài-tay-kẻ-sọc-nam-nữ-cổ-Vest-unisex-mịn-mát-giá-rẻ-áo-style-Hàn-Quốc-MỚI-(7-màu)-i.12260860.1025065219',
    });
  };

  onFinishDragProduct2 = () => {
    this.setState({
      message: 'Link for info about product 2',
      productId: 2,
      productImageUrl:
        'https://cf.shopee.vn/file/1366956e12b7c40936a1e11ffe1bd486_tn',
      productUrl:
        'https://shopee.vn/Giày-thể-thao-nữ-G425-i.35709944.626245005',
    });
  };

  onFinishDragProduct3 = () => {
    this.setState({
      message: 'Link for info about product 3',
      productId: 3,
      productImageUrl:
        'https://cf.shopee.vn/file/31df73f75132ec3f979c39c550e249b5',
      productUrl:
        'https://shopee.vn/⚡Free-ship-Giầy-PROPHERE-Nam-Nữ-đế-mầu-cực-chất-(sẵn-hình-thật-hộp)-083-i.7466021.1123770706',
    });
  };

  renderGroupInput = () => {
    const {message, dropZoneCoordinates, keyboardHeight} = this.state;
    if (Platform.OS === 'android') {
      return (
        <View
          onLayout={this.setDropZoneValues}
          style={{
            flex: 1,
            height: this.state.keyboardHeight,
            zIndex: -1,
          }}>
          <View style={styles.wrapBottom}>
            {keyboardHeight > 0 && Utils.getUserType() === 'STREAMER' && (
              <View style={styles.row}>
                <Draggable
                  imageUrl={
                    'https://cf.shopee.vn/file/3c18ee889c242196030a86b7ce86a59e_tn'
                  }
                  dropZoneCoordinates={dropZoneCoordinates}
                  onFinishDragProduct={this.onFinishDragProduct1}
                />
                <Draggable
                  imageUrl={
                    'https://cf.shopee.vn/file/1366956e12b7c40936a1e11ffe1bd486_tn'
                  }
                  dropZoneCoordinates={dropZoneCoordinates}
                  onFinishDragProduct={this.onFinishDragProduct2}
                />
                <Draggable
                  imageUrl={
                    'https://cf.shopee.vn/file/31df73f75132ec3f979c39c550e249b5'
                  }
                  dropZoneCoordinates={dropZoneCoordinates}
                  onFinishDragProduct={this.onFinishDragProduct3}
                />
              </View>
            )}
            <View style={styles.wrapInputAndActionButton}>
              <TextInput
                style={styles.textInput}
                placeholder="Comment input"
                underlineColorAndroid="transparent"
                onChangeText={this.onChangeMessageText}
                value={message}
                onEndEditing={this.onPressSend}
                autoCapitalize={'none'}
                autoCorrect={false}
                onFocus={() => {
                  this.setState({visibleListMessages: false});
                }}
                onEndEditing={() => {
                  Keyboard.dismiss();
                  this.setState({visibleListMessages: true});
                }}
              />
              <TouchableOpacity
                style={styles.wrapIconSend}
                onPress={this.onPressSend}
                activeOpacity={0.6}>
                <Image
                  source={require('../../assets/ico_send.png')}
                  style={styles.iconSend}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wrapIconHeart}
                onPress={this.onPressHeart}
                activeOpacity={0.6}>
                <Image
                  source={require('../../assets/ico_heart.png')}
                  style={styles.iconHeart}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <KeyboardAccessory backgroundColor="transparent">
          <View style={styles.wrapBottomIOS}>
            <View style={styles.col}>
              {keyboardHeight > 0 && Utils.getUserType() === 'STREAMER' && (
                <View style={styles.row}>
                  <Draggable
                    imageUrl={
                      'https://cf.shopee.vn/file/3c18ee889c242196030a86b7ce86a59e_tn'
                    }
                    dropZoneCoordinates={dropZoneCoordinates}
                    onFinishDragProduct={this.onFinishDragProduct1}
                  />
                  <Draggable
                    imageUrl={
                      'https://cf.shopee.vn/file/1366956e12b7c40936a1e11ffe1bd486_tn'
                    }
                    dropZoneCoordinates={dropZoneCoordinates}
                    onFinishDragProduct={this.onFinishDragProduct2}
                  />
                  <Draggable
                    imageUrl={
                      'https://cf.shopee.vn/file/31df73f75132ec3f979c39c550e249b5'
                    }
                    dropZoneCoordinates={dropZoneCoordinates}
                    onFinishDragProduct={this.onFinishDragProduct3}
                  />
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  height: 45,
                  marginHorizontal: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onLayout={this.setDropZoneValues}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Comment input"
                  underlineColorAndroid="transparent"
                  onChangeText={this.onChangeMessageText}
                  value={message}
                  onEndEditing={this.onPressSend}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onFocus={() => {
                    this.setState({visibleListMessages: false});
                  }}
                  onEndEditing={() => {
                    Keyboard.dismiss();
                    this.setState({visibleListMessages: true});
                  }}
                />
                <TouchableOpacity
                  style={styles.wrapIconSend}
                  onPress={this.onPressSend}
                  activeOpacity={0.6}>
                  <Image
                    source={require('../../assets/ico_send.png')}
                    style={styles.iconSend}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.wrapIconHeart}
                  onPress={this.onPressHeart}
                  activeOpacity={0.6}>
                  <Image
                    source={require('../../assets/ico_heart.png')}
                    style={styles.iconHeart}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAccessory>
      );
    }
  };

  renderListMessages = () => {
    const {listMessages, visibleListMessages} = this.state;
    if (!visibleListMessages) {
      return null;
    }
    return (
      <View style={styles.wrapListMessages}>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({animated: true});
          }}>
          {listMessages.length > 0 &&
            listMessages.map((item, index) => {
              const {
                productId,
                productUrl,
                productImageUrl,
                userId,
                message,
              } = item;
              return (
                <View style={styles.chatItem} key={index}>
                  <View style={styles.wrapAvatar}>
                    {item.avatar ? (
                      <Image source={item.avatar} style={styles.iconAvatar} />
                    ) : (
                      <Image
                        source={require('../../assets/ico_heart.png')}
                        style={styles.iconAvatar}
                      />
                    )}
                  </View>
                  <View style={styles.messageItem}>
                    {!Utils.isNullOrUndefined(productId) &&
                      !Utils.isNullOrUndefined(productUrl) &&
                      !Utils.isNullOrUndefined(productImageUrl) && (
                        <TouchableWithoutFeedback
                          onPress={() => this.onPressProduct(item)}>
                          <View style={styles.wrapSeeDetail}>
                            <Image
                              source={{uri: productImageUrl}}
                              style={styles.iconProduct}
                            />
                            <Text style={styles.textShowDetail}>
                              Click here to see detail
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      )}

                    <Text style={styles.name}>{userId}</Text>
                    <Text style={styles.content}>{message}</Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  };

  flipCamera = () => {
    console.log(this.state.cameraId)

    this.vbCamera.switchCamera()

    // if (this.state.cameraId === 0) {
    //   this.setState({cameraId: 1})
    // } else {
    //   this.setState({cameraId: 0})
    // }
  }

  renderStreamerUI = () => {
    const {liveStatus, countViewer, countHeart} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <NodeCameraView
          style={styles.streamerCameraView}
          ref={(vb) => {
            this.vbCamera = vb;

            // console.log(vb);
            // this.vbCamera.start();
          }}
          outputUrl={Utils.getRtmpPath() + Utils.getRoomName()}
          camera={{cameraId: 1//this.state.cameraId
                  , cameraFrontMirror: false}}
          audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
          video={{
            preset: 1,
            bitrate: 500000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          smoothSkinLevel={3}
          autopreview={true}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            this.setState({visibleListMessages: true});
          }}
          accessible={false}
          style={styles.viewDismissKeyboard}>
          <View style={styles.container}>
            {this.renderCancelStreamerButton()}
            <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 240,
                  backgroundColor: '#00000085',
                  paddingVertical: 7,
                  // paddingTop: 6,
                  paddingHorizontal: 17,
                  alignItems: 'center',
                  borderRadius: 10
                }}
                onPress={this.flipCamera}>
                <Text style={styles.beginLiveStreamText}>flip</Text>
              </TouchableOpacity>
            <View style={styles.wrapIconView}>
              <Image
                source={require('../../assets/ico_view.png')}
                style={styles.iconView}
              />
              <View style={styles.wrapTextViewer}>
                <Text style={styles.textViewer}>{countViewer}</Text>
              </View>
            </View>
            {this.renderGroupInput()}
            <FloatingHearts count={countHeart} style={styles.wrapGroupHeart} />
            {liveStatus === LiveStatus.REGISTER && (
              <TouchableOpacity
                style={styles.finishLiveStreamButton}
                onPress={this.onBeginLiveStream}>
                <Text style={styles.beginLiveStreamText}>Go Live</Text>
              </TouchableOpacity>
            )}
            {liveStatus === LiveStatus.ON_LIVE && (
              
              <TouchableOpacity
                style={styles.beginLiveStreamButton}
                onPress={this.onFinishLiveStream}>
                <View style={{justifyContent: 'center', flexDirection:'row'}}>
                  <View style={styles.CircleShapeView}></View>
                  
                  <Text style={styles.beginLiveStreamText}>LIVE</Text>
                </View>
              </TouchableOpacity>

              
            )}
          </View>
        </TouchableWithoutFeedback>
        {this.renderListMessages()}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.buttonCloseModal}
              onPress={this.onPressCloseModal}>
              <Image
                source={require('../../assets/ico_cancel.png')}
                style={styles.iconCancel}
              />
            </TouchableOpacity>
            <View style={styles.wrapWebview}>
              <WebView source={{uri: this.state.productUrl}} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  liveProducts = () => {
    console.log(this.props.navigation.state.params.streamerInfo.pList)

    var tempP = this.props.navigation.state.params.streamerInfo.pList;

    // console.log(this.props.products.dataSourceDup)

    var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    //  this.props.products.setState ( {dbulref: dbref});
    // meat: this is where it all happens
    var productOnline; 
    dbref.on('value', (e) => {
        var rows = [];
        // console.log(e);
        var eJSON = e.toJSON()
        for(var i in eJSON){
          var tempJSON = eJSON[i]
          tempJSON["id"] = i;
          rows.push(tempJSON);
        }
        // console.log(rows[0])
        productOnline = rows;

        // console.log(productOnline)

        var pList = []

        if (tempP !== undefined){
          for (var i = 0; i < tempP.length; ++i) {
            // console.log(productOnline.filter(function(el) { return el.id === tempP[i] })[0])

            var yo = productOnline.filter(function(el) { return el.id === tempP[i] })[0]
            // yo['isCart'] = false

            console.log('yo ', yo)

            pList.push(yo)
                
          }
        }

        this.setState({ liveProducts: pList })

     }).bind(this);


    

  }

  flipProduct(key) {
    console.log(key)
    
    var pList = this.state.liveProducts
    // pList[key].isCheck = !pList[key].isCheck

    this.setState({ liveProducts: pList })

    // if (pList[key].isCheck){
      this.props.cartFunction({product:pList[key], add:1})
    // }
    this._onToggleSnackBar()
  }

  renderViewerUI = () => {
    const BackgroundColorConfig = this.Animation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: [
        '#1abc9c',
        '#3498db',
        '#9b59b6',
        '#34495e',
        '#f1c40f',
        '#1abc9c',
      ],
    });
    const {liveStatus, countViewer, countHeart} = this.state;
    
    console.log('LIVE STATUS: ' + liveStatus);
    
    return (
      <View style={styles.container}>

        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        {liveStatus === LiveStatus.ON_LIVE || true && (
          <NodePlayerView
            style={styles.streamerCameraView}
            ref={vb => {
              this.vbViewer = vb;
            }}
            inputUrl={Utils.getRtmpPath() + Utils.getRoomName()}
            // inputUrl={'rtmp://192.168.1.2/live/' + Utils.getRoomName()}
            scaleMode="ScaleAspectFit"
            bufferTime={300}
            maxBufferTime={1000}
            autoplay
          />
          )}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            this.setState({visibleListMessages: true});
          }}
          accessible={false}
          style={styles.viewDismissKeyboard}>
          {liveStatus === LiveStatus.ON_LIVE || true ? (
            <View style={styles.container}>
              {this.renderCancelViewerButton()}
              {this.renderLiveText()}
              
              {this.state.visible ? 
                <Dialog
                  style={{height: '50%'}}
                  visible={this.state.visible}
                  onDismiss={this._hideDialog}>
                  <Dialog.Title>Live Products</Dialog.Title>
                  {/*<Dialog.Content>*/}
                    <Dialog.ScrollArea>
                      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                      {
                      
                        // list.map((l, i) => (
                        this.state.liveProducts.map((l, i) => (
                          <ListItem
                            // containerStyle={{height:100,width:1080}}
                            key={i}
                            leftAvatar={{ source: { uri: l.image } }}
                            // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                            title={l.name}
                            subtitle={l.price + " Rs."}
                            bottomDivider
                            // chevron={l.isCheck }
                            
                            // containerStyle={!l.isCheck ? {backgroundColor:'#6600ff30'} : (null)}
                            
                            onPress={() => {

                              this.flipProduct(i)
                              // this.props.navigation.navigate('detailProduct', {
                              //   item: l,
                              // });
                            }}
                          />
                        ))
                        
                      }
                      </ScrollView>
                      <Dialog.Content>
                        <Snackbar
                          visible={this.state.snackVisible}
                          // visible={true}
                          onDismiss={this._onDismissSnackBar}
                          duration={1000}
                          action={{
                            label: 'Ok',
                            onPress: () => {
                              this._onDismissSnackBar()
                            },
                          }}
                          style={{width:'100%', marginHorizontal:'6.2%'}}
                        >
                        {/*this.state.snackMessage*/}
                        Product Added
                      </Snackbar>
                      </Dialog.Content>
                    </Dialog.ScrollArea>
                  
                  
                  {/*</Dialog.Content>*/}
                </Dialog>
                 : (null)}  
              {/*<Overlay
                  isVisible={this.state.visible}
                  windowBackgroundColor="rgba(255, 255, 255, .5)"
                  overlayBackgroundColor="red"
                  width="auto"
                  height="auto"
                >
                  <Text>Hello from Overlay!</Text>
                </Overlay>*/}
              {this.renderLiveProducts()}
              <View style={styles.wrapIconView}>
                <Image
                  source={require('../../assets/ico_view.png')}
                  style={styles.iconView}
                />
                <View style={styles.wrapTextViewer}>
                  <Text style={styles.textViewer}>{countViewer}</Text>
                </View>
              </View>
              {this.renderGroupInput()}
              <FloatingHearts
                count={countHeart}
                style={styles.wrapGroupHeart}
              />
            </View>
          ) : (
            <Animated.View
              style={[
                styles.container,
                {backgroundColor: BackgroundColorConfig},
                ,
              ]}>
              {liveStatus === LiveStatus.REGISTER && (
                <View style={styles.wrapPromotionText}>
                  <Text style={styles.textPromotion}>
                    Stay here and wait until start live stream you will get 30%
                    discount 😉
                  </Text>
                </View>
              )}
              {this.renderCancelViewerButton()}
              {this.renderLiveText()}
              <View style={styles.wrapIconView}>
                <Image
                  source={require('../../assets/ico_view.png')}
                  style={styles.iconView}
                />
                <View style={styles.wrapTextViewer}>
                  <Text style={styles.textViewer}>{countViewer}</Text>
                </View>
              </View>
              {this.renderGroupInput()}
              <FloatingHearts
                count={countHeart}
                style={styles.wrapGroupHeart}
              />
            </Animated.View>
          )}
        </TouchableWithoutFeedback>
        {this.renderListMessages()}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.buttonCloseModal}
              onPress={this.onPressCloseModal}>
              <Image
                source={require('../../assets/ico_cancel.png')}
                style={styles.iconCancel}
              />
            </TouchableOpacity>
            <View style={styles.wrapWebview}>
              <WebView source={{uri: this.state.productUrl}} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  render() {

    // console.disableYellowBox = true;
    // Utils.setUserId
    console.log('debug > ' + this.props.products.userObj.uid);



    // var type = 'STREAMER';
    
    const typo = this.props.products.appMode;
    
    // Utils.setRoomName(this.props.products.userObj.email)
    Utils.setUserId(this.props.products.userObj.uid);
    // console.log('oooooo ' + Utils.getUserId())
    // console.log(typo)

    if (this.props.products.appMode === 'buyer'){

      // console.log()

      Utils.setUserType('VIEWER');
      Utils.setRoomName(this.props.navigation.state.params.streamerInfo.streamerId)
      // Utils.setRoomName('test')
      // console.log(Utils.getRoomName())
    } else {
      Utils.setUserType('STREAMER');  
      Utils.setRoomName(this.props.products.userObj.uid)
      // Utils.setUserId(this.props.products.userObj.uid);
      // console.log('oooooo ' + Utils.getUserId())

    }


    // ****** NEEDS FRONT CAMERA SWITCH
    const type = Utils.getUserType();
    

    SocketUtils.connect()

    console.log(type);
    // var type = 'STREAMER'
    if (type === 'STREAMER') {
      return this.renderStreamerUI();
    } else if (type === 'VIEWER') {

      // this.setState({liveStatus: LiveStatus.ON_LIVE})
      return this.renderViewerUI();
    }
    // return this.renderViewerUI();
  }
}

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateProducts,
    initiateProducts,
    toggleFilter,
    updateScreenVar,
    toggleSearch,
    initiatespecials,
    cartFunction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamScreen);

// export default LiveStreamScreen