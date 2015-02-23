
   (function(){
     
     // Technologies used:
     //  * local storage or cookies
     //  * cross-origin communication
     //  * promises
     
     var frame = document.createElement("iframe");
     frame.src = "https://interstorage.github.io/server.html";
     frame.style.display = "none";
     document.body.appendChild(frame);
     Object.freeze(frame);
     
     var pending = [];
     
     window.globalStorage = Object.create(null);
     
     globalStorage.get = function(name){
       frame.contentWindow.postMessage([
        "get", pending.length, name
       ],"*");
       return new Promise(function(r){
         pending.push(r);
       });
     };
     
     globalStorage.set = function(name,value){
       frame.contentWindow.postMessage([
        "set", name, value
       ],"*");
     };
     
     globalStorage.remove = function(name){
       frame.contentWindow.postMessage([
        "rm", name
       ],"*");
     };
     
     addEventListener("message",function(e){
       if(e.source !== frame.contentWindow){ return; }
       pending[ e.data[0] ]( e.data[1] );
     });
     
   })();
