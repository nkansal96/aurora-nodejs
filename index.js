'use strict';

require('./globals'); // add store to global namespace
const api = require("./api");

exports.setAppId = (id) => store.appId = id;
exports.setAppToken = (token) => store.appToken = token;
exports.setDeviceId = (id) => store.deviceId = id;

exports.getAppId = () => store.appId;
exports.getAppToken = () => store.appToken;
exports.getDeviceId = () => store.deviceId;

/*
  Text to speech
*/
class Text {
  // Contains methods for dealing with text
  constructor(text){
    this.text = text;
  }

  // Returns a promise to get a speech object. 
  speech() {
    // Convert text to speech
    // return Speech(api.getTTS(this.text));
    return api.getTTS(this.text)
    .then((audioFile) => {
      return new Speech(audioFile);
    });
  }

  interpret() {
    // Interpret the text and return the promise
    // to get the Json
    let interpretedJsonPromise = api.getInterpret(this.text);
    return interpretedJsonPromise;
  }
}
exports.Text = Text;

/*
  Interpret
*/
class Interpret {
  constructor(interpretation){
    // construct an interpret object from the API response
    this.intent = interpretation.intent;
    this.entities = interpretation.entities;
  }
}
exports.Interpret = Interpret;

/*
  Speech to text
*/
class Speech {
  constructor(audio) {
    // Speech object gets initialized with audio
    // Audio must be of type "AudioFile" as defined in ./audio.js
    // This is returned from all methods that return audio or speech
    this.audio = audio;
  }

  // Return a promise to get a Text object.
  text() {
    return api.getSTT(this.audio)
    .then((json) => {
      return new Text(json.transcript);
    });
  }

  static continuouslyListen(length=0, silenceLength=1.0){
    // continuously listen and yield speech demarcated by
    // silent periods
    throw new Error("continuouslyListen() not yet implemented");
  }

  static listen(length=0, silenceLength=1.0){
    // listen with given parameters
    // return a speech segment
    throw new Error("listen() not yet implemented");
  }

}
exports.Speech = Speech;
