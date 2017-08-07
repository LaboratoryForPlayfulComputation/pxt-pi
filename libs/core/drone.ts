
/**
 * Drone operations
 */
//%
namespace airsim {

    /**
     * A Drone client connected to a simulator or a physical drone
     */
    //% autoCreate=airsim.drone
    export class Drone {
        /**
         * Gets the IP address of the drone
         */
        public ip: string;

        /**
         * Arms the drone
         */
        //% blockId=drone_arm block="arm"
        //% defaultInstance=airsim.drone
        //% blockGap=8 weight=91
        public arm() {

        }

        /**
         * Disarms the drone
         */
        //% blockId=drone_disarm block="disarm"
        //% defaultInstance=airsim.drone
        //% blockGap=8 weight=90
        public disarm() {

        }

        /**
         * Tells the drone to take off
         * @param wait the amount of seconds to wait while the drone is taking off
         */
        //% blockId=drone_takeoff block="take off %wait"
        //% defaultInstance=airsim.drone
        //% blockGap=8 weight=89
        public takeOff(maxWaitSeconds?: number) {
            if (maxWaitSeconds <= 0) maxWaitSeconds = 10;
        }

        /**
         * Orders the drone to land
         * @param maxWaitSeconds 
         */
        //% blockId=drone_land block="land"
        //% defaultInstance=airsim.drone
        //% blockGap=8 weight=88
        public land(maxWaitSeconds?: number) {
            if (maxWaitSeconds <= 0) maxWaitSeconds = 30;
        }

        /**
         * Orders the drone to go home
         */
        //% blockId=drone_go_home block="go home"
        //% defaultInstance=airsim.drone
        //% blockGap=8 weight=87
        public goHome() {

        }

        /**
         * Orders the drone to hover in place
         */
        //% blockId=drone_hover block="hover"
        //% defaultInstance=airsim.drone
        //% weight=86
        public hover() {

        }

        /**
         * Gets the angles
         */
        //% blockId=drone_angles block="angles"
        //% defaultInstance=airsim.drone
        //% blockGap=8
        public angles(): Axis3r {
            return null;
        }

        /**
         * Gets the angular velocity
         */
        //% blockId=drone_angular_velocity block="angular velocity"
        //% defaultInstance=airsim.drone
        //% blockGap=8
        public angularVelocity(): Axis3r {
            return null;
        }

        /**
         * Gets the position
         */
        //% blockId=drone_angular_velocity block="position"
        //% defaultInstance=airsim.drone
        //% blockGap=8
        public position(): Axis3r {
            return null;
        }

        /**
         * Gets the linear velocity
         */
        //% blockId=drone_linear block="linear velocity"
        //% defaultInstance=airsim.drone
        //% blockGap=8
        public linearVelocity(): Axis3r {
            return null;
        }

        /**
         * Get the home geo point
         */
        //% blockId=drone_home_point block="home point"
        //% defaultInstance=airsim.drone
        //% blockGap=8
        public homePoint(): GeoPoint {
            return null;
        }

        /**
         * Indicates if the drone is landed
         */
        //% blockId=drone_is_landed block="is landed"
        //% defaultInstance=airsim.drone
        //% blockGap=8
        public isLanded(): boolean {
            return false;
        }

        public isOffboardMode(): boolean {
            return false;
        }

        public moveByVelocity(vx: number, vy: number, vz: number, duration: number, drivetrain: DrivetrainType, yawMode: YawMode) {

        }
        public moveByVelocityByZ(vx: number, vy: number, z: number, duration: number, drivetrain: DrivetrainType, yawMode: YawMode) {
        }
    }

    /**
     * 
     */
    //%
    export class YawMode {
        isRate: boolean;
        yawOrRate: number;        
    }

    /**
     * A Geo location point
     */    
    //%
    export class GeoPoint {
        latitude: number;
        longitude: number;
        altitude: number;
    }

    /**
     * A 3D point
     */
    //%
    export class Axis3r {
        vals_: number[];
        constructor() {
            this.vals_ = [0,0,0];
        }

    }

    /**
     * Gets the default drone
     * @param ip the IP address of the drone if any
     */
    //% blockId=airsim_drone block="drone"
    //% weight=1 advanced=true
    export function drone(ip?: string): airsim.Drone {
        return null;
    }

    /**
     * Gets a yawMode
     * @param isRate 
     * @param yawOrRate 
     */
    export function yawMode(isRate: boolean, yawOrRate: number): YawMode {
        const r = new YawMode();
        r.isRate = isRate;
        r.yawOrRate = yawOrRate;
        return r;
    }
}