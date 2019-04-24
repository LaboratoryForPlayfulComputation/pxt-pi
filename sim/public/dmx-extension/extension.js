var extId = window.location.hash.substr(1);
var hosted = false;
var idToType = {};
var usercode = {};
usercode["layout"] = {};
usercode["scenes"] = {};
usercode["patterns"] = {};

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

//saveUserCode("test", "test");

function renderUserCode() {
    var ts = `
// This file was autogenerated, do not edit...

namespace dmx { ` +
    `
    //console.info("test: " + _core.hacks.nodedmx);

    export const metadata = ${JSON.stringify(usercode)};
    export const dmxcontroller = new _core.hacks.nodedmx();
    export const intervalIDs = {};
    console.info("test: " + dmxcontroller);

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
                ts += 
                `
                //% block="${patternName}"`+
                `
                ${patternName}`
            } else {
                ts += 
                `//% block="${patternName}"`+
                `
                ${patternName},
                `
            }
        }

    ts += 
    `
    }`

    ts += 
    `
    /*
    * Dmx test block
    */
    //% blockId="dmx_layout" block="dmx layout"  
    //% blockSetVariable=rig 
    //% hidden=true
    export function dmxlayout(): Layout {
        return new Layout();
    }

    //% blockNamespace=dmx
    export class Layout {

        constructor() {}` 

    ts +=
        `
        /*
        * Dmx show scene test block
        * @param dmx layout to use, eg: dmx(rig)
        * @param scene to show
        */
        //% blockId="dmx_showscene" block="show scene"  
        export function showScene(): void {`

    ts +=
        `
        console.info(metadata);
        }

        /*
        * Dmx play pattern test block
        * @param dmx layout to use, eg: dmx(rig)
        * @param pattern to loop
        * @param timeScale
        */
        //% blockId="dmx_playpattern" block="play pattern %pattern| at %timeScale speed"  
        export function playPattern(pattern: Patterns, timeScale: number): void {
            var waittime = 0;
            var patternName = "pattern" + pattern.toString();
            `

    ts += `
    for (var i = 0; i < metadata["patterns"].length; i++) {
        var patternobj = metadata["patterns"][i];
        var patternname = Object.keys(patternobj)[0];
        if (patternname == patternName){
            for (var j = 0; j < patternobj[patternName].length; j++) {
                var data = patternobj[patternName][j];
                var time = data["time"];
                setTimeout(() => {
                    dmxcontroller.update("pidmx", data["channelData"]);
                    console.info(data["channelData"]);
                }, waittime);\n
                waittime += time;
            }
        }
    }

`

    ts += `}

        /*
        * Dmx loop pattern test block
        * @param dmx layout to use, eg: dmx(rig)
        * @param pattern to play
        */
        //% blockId="dmx_looppattern" block="loop pattern %pattern"  
        export function loopPattern(pattern: Patterns): void {
        var waittime = 0;
        var patternName = "pattern" + pattern.toString();
        `

    ts += `
    for (var i = 0; i < metadata["patterns"].length; i++) {
        var patternobj = metadata["patterns"][i];
        var patternname = Object.keys(patternobj)[0];
        if (patternname == patternName){
            // set inital timeouts and count the total waittime
            for (var j = 0; j < patternobj[patternName].length; j++) {
                var data = patternobj[patternName][j];
                var time = data["time"];
                setTimeout(() => {
                    //dmxController.update("pidmx", data["channelData"]);
                    console.info(data["channelData"]);
                }, waittime);\n
                waittime += time;
            }
            // now set animation intervals
            var totalwaittime = waittime;
            intervalIDs[patternName] = [];
            for (var j = 0; j < patternobj[patternName].length; j++) {
                var data = patternobj[patternName][j];
                var time = data["time"];
                //var id = setInterval(() => {dmxController.update("pidmx", data["channelData"])}, totalwaittime);\n
                var id = setInterval(() => {console.info(data["channelData"])}, totalwaittime);\n
                intervalIDs[patternName].push(id);
                totalwaittime += time;
            }      
        }
    } 
        `

    ts += `}
        
        /*
        * Dmx stop pattern test block
        * @param dmx layout to use, eg: dmx(rig)
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
        }

        /*
        * Dmx update fixture
        * @param dmx layout to use, eg: dmx(rig)
        * @param fixture name
        * @param value color
        */
        //% blockId="dmx_updatefixture" block="set %fixture| to %value=dmx_colors"  
        export function updateFixture(fixture: string, value: number): void {}             

        /*
        * Dmx blackout test block
        * @param dmx layout to use, eg: dmx(rig)
        * @param blackout
        */
        //% blockId="dmx_blackout" block="blackout"  
        export function blackout(): void {
            dmxController.update('pidmx', ` 
            
        ts +=  JSON.stringify(generateBlackoutJSON());
        //ts +=  JSON.stringify(generateCurrentChannelStateJSON());
        
        ts +=  `);
        }        
        `    
    
        ts += `
    }
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
        code += 'setTimeout(() => {dmxController.update("pidmx", ' + JSON.stringify(channelsData) + ')}, ' + waittime + ');\n'
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