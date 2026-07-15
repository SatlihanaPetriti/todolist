import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class TodoGateway {

    @SubscribeMessage('sendMessage')
    handleMessage(
        @MessageBody() message: string,
        @ConnectedSocket() client: Socket,
    ) {
        console.log('Received message:', message);
        console.log('Client ID:', client.id);

        return {
            event: 'messageReceived',
            data: {
                message,
                clientId: client.id,
            },
        };
    }
}