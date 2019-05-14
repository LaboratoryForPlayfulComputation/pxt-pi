var extId = window.location.hash.substr(1);
var hosted = false;
var idToType = {};
var usercode = {};
usercode["layout"] = {};
usercode["scenes"] = {};
usercode["patterns"] = {};

/* MakeCode functions for establishing the connection
 between editor and iframe extension */
function receiveMessage(ev) {
    var msg = ev.data;
    var action = idToType[msg.id];
    if (action) {
        console.debug('dmxeditor received ' + action);
        switch (action) {
            case "extinit":
                hosted = true;
                console.log('host connection completed')
                sendRequest("extreadusercode");
                break;
            case "extreadusercode":
                usercode = msg.resp || {};
                break;
            case "exthidden":
                console.log("hidden!!");
                break;
        }
        delete idToType[msg.id];
    }
}

function mkRequest(action) {
    var id = Math.random().toString();
    idToType[id] = action;
    return {
        type: "pxtpkgext",
        action: action,
        extId: extId,
        response: true,
        id: id
    }
}

function isIFrame() {
    try {
        return window && window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function sendRequest(action, body) {
    if (!isIFrame()) return;
    var msg = mkRequest(action);
    msg.body = body;
    window.parent.postMessage(msg, "*");
}
/* end of MakeCode specific functions */


function saveUserCode(fileName, out) {     
    console.log("saving user code...");       
    usercode[fileName.toLowerCase()] = out;
    usercode["layout"] = layoutToJson();
    usercode["patterns"] = [];
    for (var p = 0; p < patterns.length; p++) {
        var pattern = patterns[p];
        var patternName = "pattern" + pattern.number.toString();
        var obj = {};
        obj[patternName] = getAnimationJson(pattern);
        usercode["patterns"].push(obj);
    }
    // to do loop through animations and add generatePlayPatternCode(animation); to the code attr of the obj
    var ts = renderUserCode();
    console.log(usercode);
    sendRequest("extwritecode", {
        code: ts,                               // block code
        json: JSON.stringify(usercode, null, 2) // json metadata
    }) 
}

document.onreadystatechange = function (er) {
    if (document.readyState != "complete") return;
    window.addEventListener("message", receiveMessage, false);
    sendRequest("extinit")
}

function renderEnumCode() {
    enumCode = `
    export enum Scenes {
        //% block="test"
        test        
    }

    export enum Patterns {
    `
        for (var i = 0; i < usercode["patterns"].length; i++) {
            var obj = usercode["patterns"][i];
            var patternName = Object.keys(obj)[0];
            console.log("patternName: " + patternName);
            if (i == usercode["patterns"].length-1) {
                enumCode += 
                `
                //% block="${patternName}"`+
                `
                ${patternName}`
            } else {
                enumCode += 
                `//% block="${patternName}"`+
                `
                ${patternName},
                `
            }
        }
    enumCode += `
    }`

    enumCode += `
    export enum Fixtures {`;
        var fixturesList = usercode["layout"]["universes"][0]["fixtures"];
        for (var i = 0; i < fixturesList.length; i++){
            var fixture = fixturesList[i];
            var fixtureName = fixture["name"];
            //to do keep track of channels
            if (i == fixturesList.length-1) {
                enumCode += 
                `
                //% block="${fixtureName}"`+
                `
                ${fixtureName}`
            } else {
                enumCode += 
                `//% block="${fixtureName}"`+
                `
                ${fixtureName},
                `
            }                
        }
    
    enumCode += `
    }`

    return enumCode;
}

function renderSceneBlocksCode() {
    var blocksts = '';
    if (false) { // don't have ability to gen scene blocks yet, this is here so the block doesn't get created
        blocksts +=
        `
        /*
        * Dmx show scene test block
        * @param scene to show
        */
        //% blockId="dmx_showscene" block="show scene"  
        export function showScene(): void {}`
    }
    return blocksts;
}

function renderPatternBlocksCode() {
    if (usercode["patterns"].length > 0){
        var blocksts =`

        /*
        * Dmx play pattern test block
        * @param pattern to play
        * @param timeScale, eg: 1
        */
        //% blockId="dmx_playpattern" block="play pattern %pattern| at %timeScale speed"  
        export function playPattern(pattern: Patterns, timeScale: number): void {
            var waittime = 0;
            var patternName = "pattern" + pattern.toString();
            `

        blocksts += `
            for (var i = 0; i < metadata["patterns"].length; i++) {
                var patternobj = metadata["patterns"][i];
                var patternname = Object.keys(patternobj)[0];
                if (patternname == patternName){
                    for (var j = 0; j < patternobj[patternName].length; j++) {
                        var data = patternobj[patternName][j];
                        var time = data["time"];
                        var channelData = data["channelData"];
                        (function(data, wait) {
                            setTimeout(() => {
                                dmxcontroller.update("pidmx", data);
                                console.info(data);
                            }, wait);\n
                        })(channelData, waittime);
                        waittime += time;
                    }
                }
            }
            loops.pause(waittime);
            `

        blocksts += `}

        /*
        * Dmx loop pattern test block
        * @param pattern to play
        */
        //% blockId="dmx_looppattern" block="loop pattern %pattern"  
        export function loopPattern(pattern: Patterns): void {
        var waittime = 0;
        var patternName = "pattern" + pattern.toString();
        `

        blocksts += `
            for (var i = 0; i < metadata["patterns"].length; i++) {
                var patternobj = metadata["patterns"][i];
                var patternname = Object.keys(patternobj)[0];
                if (patternname == patternName){
                    // set inital timeouts and count the total waittime
                    for (var j = 0; j < patternobj[patternName].length; j++) {
                        var data = patternobj[patternName][j];
                        var time = data["time"];
                        var channelData = data["channelData"];
                        (function(data, wait) {
                            setTimeout(() => {
                                dmxcontroller.update("pidmx", data);
                                console.info(data);
                            }, wait);\n
                        })(channelData, waittime);
                        waittime += time;
                    }
                    // now set animation intervals
                    var totalwaittime = waittime;
                    intervalIDs[patternName] = [];
                    var id = setInterval(() => {
                        var waittime = 0;
                        for (var j = 0; j < patternobj[patternName].length; j++) {
                            var data = patternobj[patternName][j];
                            var time = data["time"];
                            var channelData = data["channelData"];
                            (function(data, wait) {
                                setTimeout(() => {
                                    dmxcontroller.update("pidmx", data);
                                    console.info(data);
                                }, wait);
                            })(channelData, waittime);
                            console.info(waittime);
                            waittime += time;
                        }                
                    }, totalwaittime);\n
                    intervalIDs[patternname].push(id);

                }
            }
        }`

        blocksts += `
            
        /*
        * Dmx stop pattern test block
        * @param pattern to stop
        */
        //% blockId="dmx_stoppattern" block="stop pattern %pattern"  
        export function stopPattern(pattern: Patterns): void {
            var patternName = "pattern"+pattern.toString();
            var intervals = intervalIDs[patternName];
            if (intervals) {
                for (var i = 0; i < intervals.length; i++) {
                    clearInterval(intervals[i]);
                }
                intervalIDs[patternName] = [];
            }
        }`
    }
    return blocksts;
}

function renderFixtureBlocksCode() {
    var blocksts = ``;
    if (usercode["layout"]["universes"][0]["fixtures"].length > 0){

        blocksts += `
        /*
        * Dmx update fixture
        * @param fixture name
        * @param value color
        */
        //% blockId="dmx_updatefixture" block="set %fixture| to %value=dmx_colors"  
        export function updateFixture(fixture: Fixtures, value: number): void {
            `
            
            blocksts += `
            for (var f=0; f < ${universe.fixtures.length}; f++) {
                var fixtureObj = ${universe.fixtures}[f];
                if (fixture = fixtureObj.name) {
                    console.info("testtt " + fixture);
                }
            }

            //dmxcontroller.update('pidmx', JSON.stringify(generateCurrentChannelStateJSON())); // will this work?
        }`

        blocksts +=`

        /*
        * Dmx blackout block
        */
        //% blockId="dmx_blackout" block="blackout"  
        export function blackout(): void {
            dmxcontroller.update('pidmx', ` 
            
        blocksts +=  JSON.stringify(generateBlackoutJSON());
        //blocksts +=  JSON.stringify(generateCurrentChannelStateJSON());
        
        blocksts +=  `);
        }`    

    }    
    return blocksts;
}

function renderUserCode() {
    var ts = `
    // This file was autogenerated, do not edit...
    
    namespace dmx { 
        console.info("initializing dmx extension namespace");
        export const metadata = ${JSON.stringify(usercode)};
        export const dmxcontroller = new _core.hacks.nodedmx();
        dmxcontroller.addUniverse('pidmx', 'dmxking-ultra-dmx-pro', '/dev/ttyUSB0');
        export const intervalIDs = {};`

    ts += renderEnumCode();
    ts += renderSceneBlocksCode();
    ts += renderPatternBlocksCode();
    ts += renderFixtureBlocksCode();
    ts += `
    }`

    console.log(ts);
    return ts;
}


/* Helper functions */
function generateBlackoutJSON() {
    var channelsObj = {}
    var channelCount = 1;
    for (var i = 0; i < universe.fixtures.length; i++) {
        var fixture = universe.fixtures[i];
        for (var j = 0; j < fixture.channels.length; j++) {
            var channel = fixture.channels[j];
            channelsObj[channelCount] = 0;
            channelCount += 1;
        }
    }
    return channelsObj;    
}

function generatePlayPatternCode(pattern) {
    var waittime = 0;
    var code = '';
    var animationJson = getAnimationJson(pattern);

    var waittime = 0;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
        var sceneData = data[key];
        var channelsData = sceneData['channelData'];
        var timeData = parseInt(sceneData['time']);
        code += 'setTimeout(() => {dmxcontroller.update("pidmx", ' + JSON.stringify(channelsData) + ')}, ' + waittime + ');\n'
        waittime += timeData;
        }
    }

    return code;
 }


function generateJSONByScene(scene) {
    //scene.fixtureInfo
}

function generateCurrentChannelStateJSON() {
    var channelsObj = {};
    var channelCount = 1;
    var firstFixture = universe.dmxController.out.connectedTo;
    if (firstFixture) {
        var fixture = firstFixture.out.connectedTo;
        while (fixture) {
            for (var c = 0; c < fixture.channels.length; c++) {
                channelsObj[channelCount] = fixture.channels[c].value;
                channelCount += 1;
            }
            var fixture = fixture.out.connectedTo;
        }
    } 
    return channelsObj;    
}