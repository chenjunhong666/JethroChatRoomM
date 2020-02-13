import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io'
import { UsersService } from '../users/users.service'
interface UserInfo {
  userID: string;
  roomValue: string;
  userName: string;
}
@WebSocketGateway()
export class InfoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  roomValue_socket: Map<string, Socket[]>;
  id_socket: Map<string, string>;
  socket_userInfo: Map<string, UserInfo>;
  constructor(private readonly usersService: UsersService) {
    this.roomValue_socket = new Map()
    this.id_socket = new Map()
    this.socket_userInfo = new Map()
  }
  handleDisconnect(client: Socket) {
    //查找信息
    let userInfo = this.socket_userInfo.get(client.id)
    if (!userInfo)
      return
    // console.log(client.id + " Disconnect")
    this.socket_userInfo.delete(client.id)
    //删除id
    this.id_socket.delete(userInfo.userID);
    //从room删除
    let index = this.roomValue_socket.get(userInfo.roomValue).findIndex((socket) => {
      return socket.id == client.id
    })
    this.roomValue_socket.get(userInfo.roomValue).splice(index, 1)
    this.roomValue_socket.get(userInfo.roomValue).forEach(socket => {
      socket.emit("quit", { userName: userInfo.userName, date: new Date().toLocaleTimeString() })
    });
  }
  handleConnection(client: any, ...args: any[]) {
    // console.log('onConnect')
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): string {
    // console.log("message")
    let userInfo = this.socket_userInfo.get(client.id)
    this.roomValue_socket.get(userInfo.roomValue).forEach((socket) => {
      if (socket.id != client.id) {
        socket.emit("message", { userName: userInfo.userName, message: payload, date: new Date().toLocaleTimeString() })
      }
    })
    return new Date().toLocaleTimeString();
  }
  @SubscribeMessage('enter')
  async handleConnect(client: Socket, payload: any) {
    // console.log(client.id + " enter " + payload.roomValue)
    if (this.id_socket.has(payload.userID)) {
      // console.log("id duplicate")
      const oldSocketID = this.id_socket.get(payload.userID)
      //修改id_socket
      this.id_socket.set(payload.userID, client.id)
      //修改socket_userInfo
      const userInfo = this.socket_userInfo.get(oldSocketID)
      this.socket_userInfo.delete(oldSocketID)
      this.socket_userInfo.set(client.id, userInfo)
      //修改roomValue_socket
      let temp = this.roomValue_socket.get(userInfo.roomValue)
      let index = temp.findIndex((socket) => socket.id == oldSocketID)
      const oldSocket = this.roomValue_socket.get(userInfo.roomValue)[index]
      if (userInfo.roomValue == payload.roomValue) {//房间一样
        this.roomValue_socket.get(userInfo.roomValue)[index] = client
      }
      else {//房间不一样
        this.roomValue_socket.get(userInfo.roomValue).splice(index, 1)
        if (!this.roomValue_socket.has(payload.roomValue)) {
          this.roomValue_socket.set(payload.roomValue, []);
        }
        this.roomValue_socket.get(payload.roomValue).push(client);
      }
      oldSocket.emit("forceOut")
      return "error";
    } else {
      //添加id
      this.id_socket.set(payload.userID, client.id);
      //添加socket映射
      const user = await this.usersService.findOneByID({ userID: payload.userID });
      const userInfo: UserInfo = { userID: payload.userID, userName: user.username, roomValue: payload.roomValue }
      this.socket_userInfo.set(client.id, userInfo)
      //添加room映射
      if (!this.roomValue_socket.has(payload.roomValue)) {
        this.roomValue_socket.set(payload.roomValue, []);
      } else {
        this.roomValue_socket.get(payload.roomValue).forEach(socket => {
          socket.emit("new", { userName: user.username, date: new Date().toLocaleTimeString() })
        });
      }
      this.roomValue_socket.get(payload.roomValue).push(client);
      return 'ok';
    }
  }
}
