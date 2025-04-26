# /join

加入指定的游戏房间

## 请求

list应该算是一个简单API请求了，你只需要向`https://api.miaaoo.com/json` 发送一个`post`请求 ~~就可以了~~ 才怪。

你需要传入一组`json`数据，来告诉服务器你要加入哪个房间。

```json5
{
  version: "1.0.0",
  //现在版只有1.0.0
  joininformation: {
    addid: "5",
    // 你添加了哪位好友就填对应好友的id数字
    // 2：MultiMC23，3：gouhope，4：HelloMC25，5：HelloMC25a
    roomfrom: "5",
    // 房间来源的好友id 在/list请求中roomfrom对应的值
    roomid: "00000000-0000-0000-0000-000000000000",
    // 在/list请求中id对应的值
    sessionname: "00000000-0000-0000-0000-000000000000"
    // 在/list请求中sessionRef中的name对应的值
  },
  invitecontrol: {
    userxuid: "000000000000000",
    // 你的xuid,可以用/getxuid获取
    verifycode: "123456"
    // 邀请功能解锁码，需要联系客服并发送自己的xuid获取。
  }
}
```

## 响应

返回状态码为`200`即为成功
