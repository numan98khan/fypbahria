import {Alert} from 'react-native';
import io from 'socket.io-client';
import moment from 'moment';
import Utils from './Utils';
import LiveStatus from './LiveStatus';
import database from '@react-native-firebase/database';

let socket = null;

const getSocket = () => {
  return socket;
};

const connect = () => {
  console.log("connecting BIAATch")
  socket = io.connect(Utils.getSocketIOIP(), {transports: ['websocket']});
  // socket = io.connect(Utils.getSocketIOIP(), {
  //   timeout: 10000,
  //   jsonp: false,
  //   transports: ['websocket'],
  //   autoConnect: false,
  //   agent: '-',
  //   path: '/', // Whatever your path is
  //   pfx: '-',
  //   key: token, // Using token-based auth.
  //   passphrase: cookie, // Using cookie auth.
  //   cert: '-',
  //   ca: '-',
  //   ciphers: '-',
  //   rejectUnauthorized: '-',
  //   perMessageDeflate: '-'
  // });
  // console.log(socket)
};

const handleOnConnect = () => {
  socket.on('connect', data => {
    console.log('connect');
  });
};

const emitRegisterLiveStream = (roomName, userId) => {
  console.log('Registration : ' + roomName + ' ' + userId);
  socket.emit('register-live-stream', {
    roomName,
    userId,
  });
};

const emitBeginLiveStream = (roomName, userId, email) => {
  database()
      .ref("live")
      .push()
      .set(
        {
          streamerId: userId,
          streamerRoom: email,
        })
      
  socket.emit(
    'begin-live-stream',
    {
      roomName,
      userId,
    },
    () => {
      console.log('register-live-stream');
    },
  );
};

const emitFinishLiveStream = (roomName, userId) => {
  database().ref('/').child('live').orderByChild('streamerId').equalTo(userId).once("value", function(snapshot) {
      // console.log(snapshot.val().key();

      snapshot.forEach(function(data) {
        database()
          .ref('/live/'+data.key)
          .remove();  
        
      });
  });
  socket.emit(
    'finish-live-stream',
    {
      roomName,
      userId,
    },
    () => {
      console.log('register-live-stream');
    },
  );
};

const emitCancelLiveStream = (roomName, userId) => {
  socket.emit('cancel-live-stream', {
    roomName,
    userId,
  });
};

const emitJoinServer = (roomName, userId) => {
  socket.emit(
    'join-server',
    {
      roomName,
      userId,
    },
    data => {
      const countViewer = data;
      Utils.getContainer().setState({countViewer: countViewer});
    },
  );
};

const handleOnClientJoin = () => {
  socket.on('join-client', () => {
    console.log('join-client');
    const countViewer = Utils.getContainer().state.countViewer;
    Utils.getContainer().setState({countViewer: countViewer + 1});
  });
};

const handleOnSendHeart = () => {
  socket.on('send-heart', () => {
    console.log('send-heart');
    const countHeart = Utils.getContainer().state.countHeart;
    Utils.getContainer().setState({countHeart: countHeart + 1});
  });
};

const emitSendHeart = roomName => {
  socket.emit('send-heart', {
    roomName,
  });
};

const handleOnSendMessage = () => {
  socket.on('send-message', data => {
    const {userId, message, productId, productImageUrl, productUrl} = data;
    const listMessages = Utils.getContainer().state.listMessages;
    const newListMessages = listMessages.slice();
    newListMessages.push({
      userId,
      message,
      productId,
      productImageUrl,
      productUrl,
    });
    Utils.getContainer().setState({listMessages: newListMessages});
  });
};

const emitSendMessage = (
  roomName,
  userId,
  message,
  productId,
  productImageUrl,
  productUrl,
) => {
  socket.emit('send-message', {
    roomName,
    userId,
    message,
    productId,
    productImageUrl,
    productUrl,
  });
};

const emitLeaveServer = (roomName, userId) => {
  socket.emit('leave-server', {
    roomName,
    userId,
  });
};

const handleOnLeaveClient = () => {
  socket.on('leave-client', () => {
    console.log('leave-client');
    const countViewer = Utils.getContainer().state.countViewer;
    Utils.getContainer().setState({countViewer: countViewer - 1});
  });
};

const emitReplay = (roomName, userId) => {
  socket.emit(
    'replay',
    {
      roomName,
      userId,
    },
    result => {
      if (!Utils.isNullOrUndefined(result)) {
        const createdAt = result.createdAt;
        const messages = result.messages;
        let start = moment(createdAt);
        for (let i = 0; i < messages.length; i += 1) {
          let end = moment(messages[i].createdAt);
          let duration = end.diff(start);
          const timeout = setTimeout(() => {
            const {message, productId, productImageUrl, productUrl} = messages[
              i
            ];
            const listMessages = Utils.getContainer().state.listMessages;
            const newListMessages = listMessages.slice();
            newListMessages.push({
              userId,
              message,
              productId,
              productImageUrl,
              productUrl,
            });
            Utils.getContainer().setState({listMessages: newListMessages});
          }, duration);
          Utils.getTimeOutMessages().push(timeout);
        }
      }
    },
  );
};

const handleOnChangedLiveStatus = () => {
  socket.on('changed-live-status', data => {
    const {roomName, liveStatus} = data;
    const currentRoomName = Utils.getRoomName();
    const currentUserType = Utils.getUserType();
    if (roomName === currentRoomName) {
      if (currentUserType === 'STREAMER') {
      } else if (currentUserType === 'VIEWER') {
        if (liveStatus === LiveStatus.CANCEL) {
          Alert.alert('Alert', 'Streamer has been canceled streaming', [
            {
              text: 'Close',
              onPress: () => {
                SocketUtils.emitLeaveServer(
                  Utils.getRoomName(),
                  Utils.getUserId(),
                );
                Utils.getContainer().props.navigation.goBack();
              },
            },
          ]);
        }
        if (liveStatus === LiveStatus.FINISH) {
          Alert.alert('Alert', 'Streamer finish streaming');
        }
        Utils.getContainer().setState({liveStatus});
      } else if (currentUserType === 'REPLAY') {
      }
    }
  });
};

const handleOnNotReady = () => {
  socket.on('not-ready', () => {
    console.log('not-ready');
    Utils.getContainer().alertStreamerNotReady();
  });
};

const SocketUtils = {
  getSocket,
  connect,
  handleOnConnect,
  emitRegisterLiveStream,
  emitBeginLiveStream,
  emitFinishLiveStream,
  handleOnClientJoin,
  emitJoinServer,
  emitCancelLiveStream,
  handleOnSendHeart,
  emitSendHeart,
  handleOnSendMessage,
  emitSendMessage,
  emitLeaveServer,
  handleOnLeaveClient,
  emitReplay,
  handleOnChangedLiveStatus,
  handleOnNotReady,
};
export default SocketUtils;