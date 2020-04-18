// let userType = null;
// let container = null;
// let userId = null;
// let roomName = null;
// let timeOutMessages = [];

let userType = 'Streamer';
let container = null;
let userId = 0;
let roomName = 0;
let timeOutMessages = [];

/**
 * CHANGE THIS ---------------------------------
 */

 // Always depends on where the deployment is done
const socketIOIP = 'http://192.168.10.4:3333';
const rtmpPath = 'rtmp://192.168.10.4:1935/live/';
/**
 *----------------------------------------------
 */

const getSocketIOIP = () => {
  return socketIOIP;
};
const getRtmpPath = () => {
  return rtmpPath;
};

const clearTimeOutMessages = () => {
  for (let i = 0; i < Utils.getTimeOutMessages().length; i += 1) {
    clearTimeout(Utils.getTimeOutMessages()[i]);
  }
  timeOutMessages = [];
};

const getTimeOutMessages = () => {
  return timeOutMessages;
};

const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

const getContainer = () => {
  return container;
};

const setContainer = con => {
  container = con;
};

const setUserType = type => {
  userType = type;
};

const getUserType = () => {
  return userType;
};

const setUserId = id => {
  userId = id;
};

const getUserId = () => {
  return userId;
};

const setRoomName = name => {
  roomName = name;
};

const getRoomName = () => {
  return roomName;
};

const Utils = {
  isNullOrUndefined,
  getUserType,
  setUserType,
  getContainer,
  setContainer,
  getUserId,
  setUserId,
  getRoomName,
  setRoomName,
  getTimeOutMessages,
  clearTimeOutMessages,
  getSocketIOIP,
  getRtmpPath,
};

export default Utils;