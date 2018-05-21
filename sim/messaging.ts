/// <reference path="../types.d.ts" />

namespace pxsim.peer {

    const HOST = 'liminal-jam.herokuapp.com';
    const PORT = 443;
    const KEY = 'peerjs';
    
    let peer : any = null;
    let connections : any = {};

    let ready: boolean = false;
    let myId: string = undefined;

    let INDEX = 0;
    let MAX = 0;
    let receipts : Packet[] = [];

    let latestError : string = "";

    var script = document.createElement('script');
    script.onload = function () {
        ready = true;
    };
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.14/peer.js";
    document.head.appendChild(script);

    function initDataConnectionCallbacks(conn: PeerJs.DataConnection){
        connections[conn.peer] = conn;
        conn.on('data', function(data: any){

            receipts[MAX] = data["data"];
            MAX += 1

            board().bus.queue(data["key"], 0x1);
        });
        conn.on('close', function() {connections[conn.peer] = undefined;});
        conn.on('error', function() {connections[conn.peer] = undefined;});
    }

    export function getEventData() {
        let ret = receipts[INDEX];
        delete receipts[INDEX];
        INDEX += 1;

        return ret;
    }

    export function getLatestError() : string {
        return latestError;
    }

    export function initialized() : boolean {
        return peer != undefined;
    }

    export function getMyId() : string {
        return myId;
    }

    export function initializePeer(id: string) {
        // Script must be loaded to use PeerJS.
        while (!ready) {}

        peer = null;

        /* Create instance of PeerJS */
        peer = new Peer(id, {
            host: HOST,
            secure: true,
            port: PORT,
            key: KEY,
            debug: 3
        });

        /* Received user ID from server */
        if (peer) peer.on('open', function(id : string) { /*updateUserId(id);*/ });
        else initializePeer(id);
        if (peer) peer.on('close', function() { });
        else initializePeer(id);
        if (peer) peer.on('disconnected', function() { initializePeer(id); });
        else initializePeer(id);
        if (peer) peer.on('error', function(err: any) {
            latestError = err;
            board().bus.queue("NetworkError", 0x1);
        });
        else initializePeer(id);
        
        /* Successfully created data connection */
        if (peer) {
            myId = id;
            peer.on('connection', function(conn: PeerJs.DataConnection) {
                initDataConnectionCallbacks(conn);
            });
        } else {
            initializePeer(id);
        }
    }

    /**
     * Peer
     * @param id The value of the marker
     */
    export function send(id: string, payload: any) { 
        let conn = connections[id];
        if(!conn || !conn.open){
            conn = peer.connect(id);
            conn.on('open', function(){
                initDataConnectionCallbacks(conn);      
                conn.send(payload);
            });                    
        }
        conn.send(payload);
    } 

    /**
     * Allows user to define callbacks for receive event
     * @param key 
     */
    export function onReceive(key: string, handler: RefAction){
        board().bus.listen(key, 0x1, handler);
    }

}