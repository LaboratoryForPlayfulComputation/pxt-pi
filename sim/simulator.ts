/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../types.d.ts" />

namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();
    };

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    interface SocketRequest {
        req: raspberryPi.Request;
        resolve: (resp?: raspberryPi.Response) => void;
        time: number;
        initiated?: boolean;
    }

    export enum EventType {
        INFO,
        WARN,
        ERROR
    }

    export class EventDescription {
        public readonly type: EventType;
        public readonly message: string;
        public readonly timestamp: Date;

        constructor(type : EventType, msg : string, date: Date) {
            this.type = type;
            this.message = msg;
            this.timestamp = date;
        }

        quickStamp() {
            const t = this.timestamp;
            return t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds() + '.' + t.getMilliseconds();
        }
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public id : string;
        public bus: EventBus;
        public eventLog: EventDescription[];
        public eventTable: HTMLTableElement;

        private nextId = 0;
        private requests: Map<SocketRequest> = {};


        constructor() {
            super();
            this.bus = new EventBus(runtime);
            this.eventLog = [];
            this.eventTable = document.getElementById('eventTable') as HTMLTableElement;
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.logEvent(
                EventType.INFO,
                "Initialized"
            );
            return Promise.resolve();
        }

        logEvent(type : EventType, msg: string) {
            let t = Date.now();
            let ev = new EventDescription(type, msg, new Date(t));

            this.eventLog.push(ev);

            let newRow = document.createElement('tr');
            newRow.id = "evt" + t.toString();
            let typecolumn = document.createElement('td');
            typecolumn.innerHTML = type.toString();
            let msgcolumn = document.createElement('td');
            msgcolumn.innerHTML = msg;
            let timecolumn = document.createElement('td');
            timecolumn.innerHTML = ev.quickStamp();
            newRow.appendChild(typecolumn);
            newRow.appendChild(msgcolumn);
            newRow.appendChild(timecolumn);

            if (this.eventTable.children.length > 1)
            {
                this.eventTable.insertBefore(
                    newRow,
                    this.eventTable.children[1]
                )
            } else {
                this.eventTable.appendChild(newRow);
            }
        }

        queueRequestAsync(req: raspberryPi.Request): Promise<any> {
            const id = this.nextId++; // `${runtime.id}-${}`;
            req.id = id + "";
            return server.initPiAsync()
                .then(ws => {
                    if (ws) return new Promise((resolve, reject) => {
                        const r: SocketRequest = {
                            req,
                            resolve,
                            time: new Date().getTime()
                        };
                        this.requests[id] = r;
                        ws.send(JSON.stringify(req));
                        console.log('queueRequestAsync');
                    })
                    else return undefined;
                });
        }


        handleResponse(resp: raspberryPi.Response) {
            const id = resp.id;
            const req = this.requests[id];
            // pending request?
            if (req) {
                req.resolve(resp);
                delete this.requests[id];
            } else if (resp.type === "event") {
                const ev = resp as raspberryPi.Event;
                this.bus.queue(ev.eventId, ev.eventName);
            }
        }


        kill() {
            super.kill();
            this.requests = {};
            peer.disconnect();
            peer.clearQueues();
        }
        
        updateView() {}
    }
}