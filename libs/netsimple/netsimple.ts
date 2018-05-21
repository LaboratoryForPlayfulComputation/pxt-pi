//% weight=10 color=#93a1a1 icon="\uf0c2"
namespace network {

	//% blockId="intialNet" block="use network as %id"
	export function initializeBlock(id: string) {
		network.init(id);
	}

	//% blockId="sendBlock" block="send %msg to %to"
	export function send(msg: number, to: string) {
		let p : Packet = network.makePacket();
		network.addNumber(p, msg);
		network.sendPacket(to, "Test", p);
	}

	//% blockId="receiveBlock" block="on receive value"
	export function onReceive(handler: (msg : number) => void) {
		network.handlePacket("Test", () => {
			let p = network.getPacket();
			handler(network.getNumber(p, 0));
		});
	}

	//% blockId="onErrorBlock" block="on network error"
	export function onNetworkError(handler: (message: string) => void) {
		network.handleError(() => {
			let emsg = network.getErrorMessage();
			handler(emsg);
		})
	}
}