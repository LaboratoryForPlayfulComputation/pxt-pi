//% block="Google Sheets" weight=30 color=#27a465 icon="\uf298"
namespace sheets {

    export class Spreadsheet {
        constructor() { };
        //% blockId="clear" block="clear %sheet"
        clear(): void { };
        //% blockId="readRow" block="read from %sheet row %row"
        readRow(row: number): string[] { return undefined };
        //% blockId="readCell" block="read from %sheet cell %cell"
        readCell(cell: string): string { return '' };
        //% blockId="append" block="to %sheet append %row"
        appendRow(row: string[]): void { };
    }

    //% blockId="createSheet" block="create new sheet called %title"
    export function createSheet(title: string): Spreadsheet { return new Spreadsheet() }

    //% blockId="getSheet" block="get sheet from id %id"
    export function getSheet(id: string): Spreadsheet { return new Spreadsheet() }
}