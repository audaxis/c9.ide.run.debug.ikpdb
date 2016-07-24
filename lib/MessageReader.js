/**
 * Inouk Python Debugger
 * @copyright 2016, Cyril MORISSE
 */

define(function(require, exports, module) {
    "use strict";
    
    var MessageReader = module.exports = function(socket, callback) {
        this.MAGIC_CODE = "LLADpcdtbdpac";

        this._socket = socket;
        this._callback = callback;
    
        this._receivedData = "";
        
        // We want the data handling callback to be ran 
        // with this = MessageReader instance
        this._boundOnReceive = this._onReceive.bind(this);
        socket.on("data", this._boundOnReceive);
    };
    
    (function() {
    
        this._onReceive = function(data) {
            console.debug("_onReceive(data) => "+data);
            this._receivedData += data;
    
            var fullResponse = null;
            while (fullResponse = this._checkForWholeMessage())
                this._callback(fullResponse);
        };
    
        this._checkForWholeMessage = function() {
            var i, c, l;
            var responseLength;
            var fullResponse = false;
            var received = this._receivedData;
            if ((i = received.indexOf(this.MAGIC_CODE)) != -1) {
                if ((c = received.indexOf("length=")) != -1) {
                    l = received.substring(c + 7);
                    l = l.substring(0, l.indexOf(this.MAGIC_CODE));
                    responseLength = i + 13 + parseInt(l, 10);
                    if (responseLength <= received.length) {
                        fullResponse = received.substring(0, responseLength);
                        this._receivedData = received.substring(responseLength);
                        this._socket.setMinReceiveSize(0);
                    }
                    else {
                        this._socket.setMinReceiveSize(responseLength - received.length);
                    }
                }
            }
            return fullResponse;
        };
    
        this.destroy = function() {
            this._socket && this._socket.removeListener("data", this._boundOnReceive);
            delete this._socket;
            delete this._callback;
            this._received = "";
        };
    
    }).call(MessageReader.prototype);

});