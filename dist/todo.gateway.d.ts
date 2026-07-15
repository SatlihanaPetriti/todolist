import { Socket } from 'socket.io';
export declare class TodoGateway {
    handleMessage(message: string, client: Socket): {
        event: string;
        data: {
            message: string;
            clientId: string;
        };
    };
}
