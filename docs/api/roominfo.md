# /roominfo

获取房间中的信息

## 请求

/roominfo大概算是一个简单API请求了，你只需要向`https://api.miaaoo.com/roominfo` 发送一个`get`请求并传入`sessionRef.name`跟
`roomfrom`的值即可。

例如：

```bash
https://api.miaaoo.com/roominfo?session=00000000-0000-0000-0000-000000000000&roomfrom=6
```

## 响应

```json5

{
  "membersInfo": {
    "first": 0,
    "next": 1,
    "count": 1,
    "accepted": 1,
    "active": 1
  },
  "constants": {
    "system": {
      "readyRemovalTimeout": 240000,
      "reservedRemovalTimeout": 240000,
      "sessionEmptyTimeout": 0,
      "inactiveRemovalTimeout": 300000,
      "version": 1,
      "maxMembersCount": 30,
      "visibility": "open",
      "capabilities": {
        "connectivity": true,
        "connectionRequiredForActiveMembers": true,
        "gameplay": true,
        "crossPlay": true,
        "userAuthorizationStyle": true
      },
      "inviteProtocol": "game",
      "memberInitialization": {
        "membersNeededToStart": 1
      }
    },
    "custom": {}
  },
  "properties": {
    "system": {
      "joinRestriction": "followed",
      "readRestriction": "followed",
      "turn": []
    },
    "custom": {
      "Joinability": "joinable_by_friends",
      "hostName": "HelloMC25b5988",
      // 房主名
      "ownerId": "000000000000000",
      // xuid
      "rakNetGUID": "",
      "version": "1.21.113",
      // 版本号
      "levelId": "aaaaaaa=",
      "worldName": "My World",
      //地图名称
      "worldType": "Survival",
      "protocol": 000,
      "MemberCount": 1,
      "MaxMemberCount": 5,
      "BroadcastSetting": 3,
      "LanGame": true,
      "isEditorWorld": false,
      "isHardcore": false,
      "TransportLayer": 2,
      "OnlineCrossPlatformGame": true,
      "CrossPlayDisabled": false,
      "TitleId": 0,
      "SupportedConnections": [
        {
          "ConnectionType": 3,
          "HostIpAddress": "",
          "HostPort": 0,
          "NetherNetId": 000000000000000
        }
      ]
    }
  },
  "servers": {},
  "members": {
    "0": {
      // 人数下标 0 开始 
      "next": 1,
      "joinTime": "2025-10-10T10:10:10.1000000Z",
      "constants": {
        "system": {
          "initialize": true,
          "xuid": "000000000000000",
          "index": 0
        },
        "custom": {}
      },
      "properties": {
        "system": {
          "subscription": {
            "id": "00000000-0000-0000-0000-000000000000",
            "changeTypes": [
              "everything"
            ]
          },
          "active": true,
          "connection": "00000000-0000-0000-0000-000000000000"
        },
        "custom": {}
      },
      "gamertag": "HelloMC25b5988",
      "activeTitleId": "0000000000"
    },
    "1": {}
    // 第二名玩家
  },
  "correlationId": "00000000-0000-0000-0000-000000000000",
  "contractVersion": 107,
  "branch": "00000000-0000-0000-0000-000000000000",
  "changeNumber": 3,
  "startTime": "2025-10-10T10:10:10.1000000Z"
}


```

## 响应码

::: details HTTP 40X

```json5 [400]
{
  "status": "400",
  "message": "Missing session or roomfrom parameter, or invalid roomfrom value.",
  "message_zh_CN": "缺少 session 或 roomfrom 参数，或 roomfrom 值无效。"
}
```

```json5 [403]
{
  "status": "403",
  "message": "The requested session cannot be accessed. The calling user must have the multiplayer privilege and must be a member of the session if the session either is private or has a read restriction on it that the user doesn't satisfy, multi-user requests aren't allowed for large sessions, banned xuids can't access the session, users must have the communicate permission to access sessions that require it, and devices other than an Xbox One can only access sessions with user-style authorization.\r\n",
  "message_zh_CN": "从 Xbox Live API 获取会话数据时出错。"
}
```

:::

## 尝试

<PostButton url="roominfo" method="GET" body="session=00000000-0000-0000-0000-000000000000&roomfrom=6" />
