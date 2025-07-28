# /list

获取房间列表信息
 
## 请求

/list是一个最简单API请求了，你只需要向`https://api.miaaoo.com/list` 发送一个`get`请求就可以了。

## 响应

下面请求到的返回信息，是一个`json`格式的数据，我们来逐一解释各个字段的含义。

```json5
{
  "results": [
    {
      "sessionRef": {
        "name": "00000000-0000-0000-0000-000000000000"  
      },   //广播房间uuid，在/join请求中sessionname对应的值
      "createTime": "2025-01-01T02:06:09.1234569Z",  //房间创建时间
      "id": "00000000-0000-0000-0000-000000000000",     
      //房间uuid 在/join请求中roomid对应的值
      "customProperties": {
        "hostName": "Steven",  // 房主名
        "ownerId": "000000000000000", // 房主xuid
        "version": "1.21.69", //游戏版本号
        "worldName": "114514", //地图名称
        "worldType": "Survival",
        //游戏模式对应值如下 生存：Survival, 创造：Creative, 旁观：Spectator
        "MemberCount": 69,  //房间人数
        "MaxMemberCount": 666,  //房间上限人数
        "BroadcastSetting": 3,
        //房间广播设置，3：好友的好友，2：仅好友，1：仅邀请”，只有值为3的房间才能让外人加入。
        "isHardcore": false  // 是否为极限模式
      },
      "roomfrom": "5"  //现在仅有5可添加好友
      //好友房间来源 在/join请求中roomfrom对应的值，对应关系如下
      // 2：MultiMC23，3：gouhope，4：HelloMC25，5：HelloMC25a，6：HelloMC25b5988
    }
    // 以下房间信息同上
  ]
}
```

<PostButton url="list" method="GET" body="" />

