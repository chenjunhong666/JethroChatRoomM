import { SubscribeMessage, WebSocketGateway,OnGatewayConnection,OnGatewayDisconnect } from '@nestjs/websockets';
import {Socket} from 'socket.io'

interface UserInfo{
  userID : string;
  roomValue : string;
}
@WebSocketGateway()
export class InfoGateway implements OnGatewayConnection,OnGatewayDisconnect{
  roomValue_socket: Map<string, Socket[]>;
  id_socket: Map<string, string>;
  socket_idAndRoom: Map<string,UserInfo>;
  constructor() {
    this.roomValue_socket = new Map()
    this.id_socket = new Map()
    this.socket_idAndRoom = new Map()
  }
  handleDisconnect(client: Socket) {
    
    //查找信息
    let userInfo = this.socket_idAndRoom.get(client.id)
    this.socket_idAndRoom.delete(client.id)
    //删除id
    this.id_socket.delete(userInfo.userID);
    //从room删除
    let index = this.roomValue_socket.get(userInfo.roomValue).findIndex((socket)=>{
      return socket.id == client.id
    })
    this.roomValue_socket.get(userInfo.roomValue).splice(index,1)
  }
  handleConnection(client: any, ...args: any[]) {
    // console.log('onConnect')
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): string {
    let userInfo = this.socket_idAndRoom.get(client.id)
    this.roomValue_socket.get(userInfo.roomValue).forEach((socket)=>{
      if(socket.id != client.id){
        socket.emit("message",{userName:userInfo.userID,message:payload})
      }
    })
    return 'ok';
  }
  @SubscribeMessage('enter')
  handleConnect(client: Socket, payload: UserInfo): string {
    if(this.id_socket.has(payload.userID)){
      console.log("id duplicate")
      return "error";
    }else{
      //添加id
      this.id_socket.set(payload.userID,client.id);
      //添加room映射
      if(!this.roomValue_socket.has(payload.roomValue)){
        this.roomValue_socket.set(payload.roomValue,[]);
      }else{
        this.roomValue_socket.get(payload.roomValue).forEach(socket => {
          socket.emit("new",payload.userID + " enter " + payload.roomValue + "号聊天室")
        });
      }
      this.roomValue_socket.get(payload.roomValue).push(client);
      //添加socket映射
      this.socket_idAndRoom.set(client.id,payload)
      return 'ok';
    }
  }
}
