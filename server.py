#encoding:utf-8
import sys,socket,threading,struct,base64,hashlib,json,random

#用户指令
#用户注册：1
#用户列表更新：2
#用户注销： 3
#清空用户：4
#剔除指定用户：5

#同步指令：
#同步位置信息：11

#操作指令：20
#开火: 21

game_user = []
user_code = {} #用户指令
user_xy =   {} #用户位置

def getWsid():
    x = random.randint(1,100)
    if(x not in game_user):
        return x
    else:
        return getWsid()

#这算是客户端一个循环接受数据并且处理数据的线程
def DoRemoteCommand(connection):
    global game_user,user_code,user_xy
    wsid = getWsid()
    user_num = len(game_user)
    try:
        while 1:
            if(user_num != len(game_user)):
                rs = {"code":2,"list":game_user}
                SendData(rs,connection)
                user_num = len(game_user)


            szBuf = RecvData(8196,connection)
            if(szBuf == False or szBuf == ""):
                break
            else:
                print game_user
                try:
                    encodedjson = json.loads(szBuf)
                except:
                    pass

                # if( encodedjson['code'] == 10 ):
                #     if(encodedjson['wsid'] == 1):
                #         rs = {"code":10}
                #         rs['keys'] = keys_2;
                #         keys_2 = {};
                #     elif(encodedjson['wsid'] == 2):
                #         rs = {"code":10}
                #         rs['keys'] = keys_1;
                #         keys_1 = {};
                #     else:pass
                #     SendData(rs,connection)
                #
                # elif( encodedjson['code'] == 20 ):
                #     if(encodedjson['wsid'] == 1):
                #         keys_1 =  encodedjson['keys']
                #     elif(encodedjson['wsid'] == 2):
                #         keys_2 =  encodedjson['keys']
                #     else:pass
                #
                # elif( encodedjson['code'] == 12 ):
                #     if(encodedjson['wsid'] == 1):
                #         if(keys_1.has_key(encodedjson['key'])):
                #             keys_1[str(encodedjson['key'])] = 1;
                #         else:
                #             keys_1[str(encodedjson['key'])] = 1;
                #     elif(encodedjson['wsid'] == 2):
                #         if(keys_2.has_key(encodedjson['key'])):
                #             keys_2[str(encodedjson['key'])] = 1;
                #         else:
                #             keys_2[str(encodedjson['key'])] = 1;
                #     else:pass
                #
                # elif( encodedjson['code'] == 21 ):
                #     if(encodedjson['wsid'] == 1):
                #         if(keys_1.has_key(encodedjson['key'])):
                #             keys_1[str(encodedjson['key'])] = 0;
                #         else:
                #             keys_1[str(encodedjson['key'])] = 0;
                #     elif(encodedjson['wsid'] == 2):
                #         if(keys_2.has_key(encodedjson['key'])):
                #             keys_2[str(encodedjson['key'])] = 0;
                #         else:
                #             keys_2[str(encodedjson['key'])] = 0;
                #     else:pass

                #同步位置信息
                if( encodedjson['code'] == 11 ):
                    user_xy[str(wsid)] = str(encodedjson['xy'])
                    rs = {"code":11,"xy":user_xy,"key":user_code}
                    SendData(rs,connection)
                #开火
                elif( encodedjson['code'] == 20 ):
                    key = str(encodedjson['key'])
                    if(key == "21"):
                        user_code[str(wsid)] = str(encodedjson['key'])
                    elif(key == "22"):
                        user_code.pop(str(wsid))
                #用户注册
                elif( encodedjson['code'] == 1 ):
                    game_user.append(wsid)
                    rs = {"code":1,"wsid":wsid}
                    SendData(rs,connection)
                #请求用户列表
                elif( encodedjson['code'] == 2 ):
                    rs = {"code":2,"list":game_user}
                    SendData(rs,connection)
                #清除用户
                elif( encodedjson['code'] == 4 ):
                    game_user = [];
                #删除指定用户
                elif( encodedjson['code'] == 5 ):
                    if(wsid in game_user):game_user.remove(wsid)

        if(wsid in game_user): game_user.remove(wsid)
    except KeyboardInterrupt:
        if(wsid in game_user): game_user.remove(wsid)
        sys.exit(0)


import socket,threading,struct

#启动websocket server
def InitWebSocketServer():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.bind(("192.168.10.100",8484)) #绑定本地地址,端口3398
        sock.listen(100)
    except:
        print(u"这个端口已经被占用了！")
        sys.exit() 
    while True:  #创建一个死循环,接受客户端
        connection,address = sock.accept()
        if(handshake(connection) != False): #如果握手失败,不启动任务
            t = threading.Thread(target=DoRemoteCommand,args=(connection,))
            #t.setDaemon(True)
            t.start()

#连接成功后回应给客户端进行握手
def handshake(client):
    headers = {}
    shake = client.recv(1024)
    
    if not len(shake):
        return False
    
    header, data = shake.split('\r\n\r\n', 1)
    for line in header.split("\r\n")[1:]:
        key, value = line.split(": ", 1)
        headers[key] = value
    
    if(headers.has_key("Sec-WebSocket-Key") == False):
        print(u"建立连接不成功！")
        client.close()
        return False
    
    #szOrigin = headers["Sec-WebSocket-Origin"]
    szKey = base64.b64encode(hashlib.sha1(headers["Sec-WebSocket-Key"] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest())
    szHost = headers["Host"]
    
    our_handshake = "HTTP/1.1 101 Switching Protocols\r\n" \
                    "Upgrade:websocket\r\n"\
                    "Connection: Upgrade\r\n"\
                    "Sec-WebSocket-Accept:"+ szKey + "\r\n" \
                    "WebSocket-Location: ws://" + szHost + "\r\n" \
                    "WebSocket-Protocol:WebManagerSocket\r\n\r\n"
                    
    client.send(our_handshake)
    return True

#接收客户端发送过来的消息,并且解包
def RecvData(nNum,client):
    try:
        pData = client.recv(nNum)
        if not len(pData):
            return False
    except:
        return False
    else:
        code_length = ord(pData[1]) & 127
        if code_length == 126:
            masks = pData[4:8]
            data = pData[8:]
        elif code_length == 127:
            masks = pData[10:14]
            data = pData[14:]
        else:
            masks = pData[2:6]
            data = pData[6:]
        
        raw_str = ""
        i = 0
        for d in data:
            raw_str += chr(ord(d) ^ ord(masks[i%4]))
            i += 1
            
        return raw_str
        
        
#打包发送数据给客户端
def SendData(pData,client):
    if(pData == False):
        return False
    else:
        pData = str(pData)
        
    token = "\x81"
    length = len(pData)
    if length < 126:
        token += struct.pack("B", length)
    elif length <= 0xFFFF:
        token += struct.pack("!BH", 126, length)
    else:
        token += struct.pack("!BQ", 127, length)
    pData = '%s%s' % (token,pData)

    client.send(pData)
    
    return True

InitWebSocketServer()
