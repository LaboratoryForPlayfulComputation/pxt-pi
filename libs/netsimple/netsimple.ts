//% weight=10 color=#090909 icon="\uf0c2"
namespace network {
	//% blockId="sendBlock" block="send %msg to %to as %from"
	export function send(msg: number, to: string, from: string) {
		peer.send(from, to, {
			key: "ValueMessage"
		})
	}

	//% blockId="receiveBlock" block="on receive value"
	export function receive(handler: () => void) {
		peer.onReceive("ValueMessage", handler);
	}
}