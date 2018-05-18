namespace pxsim.peer {

    const HOST = 'liminal-jam.herokuapp.com';
    const PORT = 443;
    const KEY = 'peerjs';
    
    let peer : any = null;
    let connections : any = {};

    let ready: boolean = false;
    let myId: string = undefined;

    var script = document.createElement('script');
    script.onload = function () {
        ready = true;
    };
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.14/peer.js";
    document.head.appendChild(script);

    function initDataConnectionCallbacks(conn: PeerJs.DataConnection){
        connections[conn.peer] = conn;
        conn.on('data', function(data: any){
            board().bus.queue(data["key"], 0x1);
        });
        conn.on('close', function() {connections[conn.peer] = undefined;});
        conn.on('error', function() {connections[conn.peer] = undefined;});  
    }

    function initializePeer(id: string){
        // Script must be loaded to use PeerJS.
        while (!ready) {}

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
        if (peer) peer.on('disconnected', function() { });
        else initializePeer(id);
        if (peer) peer.on('error', function(err: any) { });
        else initializePeer(id);
        
        /* Successfully created data connection */
        if (peer) peer.on('connection', function(conn: PeerJs.DataConnection) { initDataConnectionCallbacks(conn); });
        else initializePeer(id);
    }

    /**
     * Peer
     * @param id The value of the marker
     */
    //% promise
    export function sendAsync(from: string, id: string, payload: any) : Promise<void> { 
        if (peer && from == myId){
            let conn = connections[id];
            if(!conn || !conn.open){
                conn = peer.connect(id);
                return conn.on('open', function(){
                    initDataConnectionCallbacks(conn);      
                    return conn.send(payload);
                });                    
            }
            return conn.send(payload);
        } else {
            myId = from;
            initializePeer(from);
            return sendAsync(from, id, payload);
        }
    } 

    /**
     * Allows user to define callbacks for receive event
     * @param key 
     */
    //% promise
    export function onReceiveAsync(key: string, handler: RefAction) : Promise<void> {
        board().bus.listen(key, 0x1, handler);
        return Promise.resolve();
    }

}