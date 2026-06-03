# MCP 全新对接文档（v2 完整版）

> 面向 AI 编码助手 / MCP 协议的机器接口文档。  
> 用于指导 AI 从零生成对接代码，涵盖所有 v2 可用接口。

---

## 目录

- [1. 基础信息](#1-基础信息)
- [2. /listv2](#2-listv2)
- [3. /joinv2](#3-joinv2)
- [4. /accountv2](#4-accountv2)
- [5. /refreshFollowers](#5-refreshfollowers)
- [7. /roominfo](#7-roominfo)
- [8. /profile](#8-profile)
- [9. /getxuid](#9-getxuid)

---

## 1. 基础信息

| 项目 | 值 |
|------|-----|
| 基础 URL | `https://api.miaaoo.com` |
| Content-Type | `application/json` |
| 通用响应字段 | `status`(错误时), `code`(错误码), `message`(英文), `message_zh_CN`(中文) |
| 成功状态码 | 200 |
| 错误状态码 | 400, 403, 404, 500, 502 |
| 限流行为 | 部分接口 10 秒全局锁，超限返回 206 |

**错误处理建议**：始终用 `try/catch` 包裹请求，因为后端部分场景不会返回标准 JSON 错误体。

---

## 2. /listv2

### 请求

```
GET https://api.miaaoo.com/listv2
```

### 参数

| 参数 | 位置 | 类型 | 必需 | 说明 |
|------|------|------|------|------|
| `lang` | query | string | ❌ | 语言筛选，可多值 `?lang=zh&lang=en` |

### 成功响应 200

```ts
{
  results: Array<{
    sessionRef: { name: string }                 // 会话 UUID
    ownerXuid: string                             // 房主 XUID
    createTime: string                            // ISO 8601 UTC
    id: string                                    // handle ID
    customProperties: {
      hostName: string                            // 房主名（纯英文 ≤16 字符）
      ownerId: string                             // 房主 XUID
      version: string                             // 游戏版本
      worldName: string                           // 世界名
      worldType: "Survival" | "Creative" | "Spectator"
      protocol: number
      MemberCount: number
      MaxMemberCount: number
      BroadcastSetting: 1 | 2 | 3               // 3=可加入
      isEditorWorld: boolean
      isHardcore: boolean
      RealmId: string
      worldNameLang?: string                     // 语言代码
    }
    relatedInfo: {
      maxMembersCount: number
      membersCount: number
    }
    roomfrom: string                              // 来源账号 ID
  }>
}
```

### 错误响应

| code | 含义 |
|------|------|
| 1 | Redis 无数据 |
| 2 | 数据格式异常或读取错误 |

### 代码示例 (TypeScript)

```ts
async function fetchRoomList(lang?: string | string[]) {
  const params = new URLSearchParams()
  if (lang) {
    const langs = Array.isArray(lang) ? lang : [lang]
    langs.forEach(l => params.append('lang', l))
  }
  const url = `https://api.miaaoo.com/listv2?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`listv2 error: code=${err.code} msg=${err.message}`)
  }
  return (await res.json()).results as RoomItem[]
}
```

### 数据生命周期

- 后端每 30 秒执行一次 `getGameList`，刷新 Redis
- Redis TTL = 60 秒
- `/listv2` 强依赖于 `follower` 缓存，若缓存为空则返回空列表

---

## 3. /joinv2

### 请求

```
POST https://api.miaaoo.com/joinv2
Content-Type: application/json
```

### 新版协议（apiversion=2，推荐）

```ts
{
  apiversion: 2,
  joininformation: {
    addid: string     // 发起加入的账号 ID
    roomfrom: string  // 房间来源账号 ID
    handleid: string  // 目标会话 handle ID
    sessionname: string // 会话名称
    userxuid: string  // 玩家 XUID，16 位数字，必需
  }
}
```

### 成功响应

```ts
// 新版协议成功
{ status: "200", code: "1", message: "Success.", message_zh_CN: "成功。" }

### 错误码

| HTTP | code | 原因 |
|------|------|------|
| 400 | 1 | 缺少 joininformation 或参数不完整 |
| 400 | 2 | addid 或 roomfrom 不允许 |
| 400 | 3 | userxuid 缺失或非 16 位数字（新版） |
| 403 | 4 | userxuid 不在 followers 中 |
| 404 | 0 | 会话句柄查询无结果 |
| 5xx | 0 | XBL 操作失败 |
| xxx | 5 | 自动添加关注失败 |

### 数据流总览

`/joinv2` 的数据来自两个上游接口的联动：

```
/accountv2 ──→ 提供 addid（用哪个账号发起加入）
/listv2    ──→ 提供 roomfrom、handleid、sessionname（目标房间信息）
用户输入   ──→ 提供 userxuid（要加入的玩家 XUID）
              ↓
         POST /joinv2
```

### 字段映射规则

| `/joinv2` 字段 | 数据来源 | 获取方式 |
|---------------|---------|---------|
| `addid` | `/accountv2` | 用户选择用哪个已添加的账号去加入。取出该账号的 `id`，如 `"8"` |
| `roomfrom` | `/listv2` | 用户选中一个房间后，取该房间的 `roomfrom` 字段，如 `"6"` |
| `handleid` | `/listv2` | 用户选中房间的 `id` 字段 |
| `sessionname` | `/listv2` | 用户选中房间的 `sessionRef.name` 字段 |
| `userxuid` | **用户输入** | 玩家自己的 16 位 XUID，由玩家手动输入或从玩家设备获取 |

### 完整对接流程（AI 实现参考）

```
Step 1 — 获取可用账号列表
  GET /accountv2 → 得到 Array<{ id, name, canaddfriends }>
  以列表形式展示给用户，让用户选择用哪个账号发起加入 → 得到 addid

Step 2 — 获取房间列表
  GET /listv2 → 得到 results: Array<{ id, sessionRef, roomfrom, ...customProperties }>
  展示房间列表给用户（展示 worldName、hostName、MemberCount/MaxMemberCount 等）
  用户选择一个房间 → 得到该房间的: id→handleid, sessionRef.name→sessionname, roomfrom

Step 3 — 获取玩家 userxuid
  用户输入要加入的玩家 XUID（16 位数字字符串）
  
  ⚠️ 注意：userxuid 必须是 addid 账号已关注（followers）中的 XUID，
  否则后端返回 403 code=4。可引导用户先调用 /refreshFollowers 刷新缓存。

Step 4 — 构建请求体并调用 /joinv2
  POST /joinv2
  {
    "apiversion": 2,
    "joininformation": {
      "addid": addid,       // 从 Step 1 获得
      "roomfrom": roomfrom, // 从 Step 2 获得
      "handleid": handleid, // 从 Step 2 获得
      "sessionname": sessionname, // 从 Step 2 获得
      "userxuid": userxuid  // 从 Step 3 获得
    }
  }
```

### 关键业务逻辑说明

#### 2. userxuid 的必要性

v2 协议中 `userxuid` 为 **必需** 参数，用于：
- 后端校验该玩家是否在 `addid` 账号的 followers（粉丝） 中（权限检查）
- 自动添加关注

#### 3. 注意事项

- `BroadcastSetting` 为 `3` 的房间才能被外部玩家加入，前端可据此筛选可加入的房间
- 确保 `handleid` 和 `sessionname` 以**字符串**类型发送，不要使用数字类型
### 代码示例 (TypeScript) — 完整对接

```ts
interface AccountInfo {
  id: string
  name: string
  canaddfriends: boolean
}

interface RoomItem {
  id: string
  sessionRef: { name: string }
  roomfrom: string
  ownerXuid: string
  customProperties: {
    hostName: string
    worldName: string
    worldType: string
    MemberCount: number
    MaxMemberCount: number
    BroadcastSetting: number
    version: string
  }
}

/** Step 1: 获取账号列表 */
async function getAccounts(): Promise<AccountInfo[]> {
  const res = await fetch('https://api.miaaoo.com/accountv2')
  return await res.json()
}

/** Step 2: 获取房间列表 */
async function getRoomList(): Promise<RoomItem[]> {
  const res = await fetch('https://api.miaaoo.com/listv2')
  if (!res.ok) throw new Error(`listv2 error: ${res.status}`)
  return (await res.json()).results
}

/** Step 3+4: 加入房间（接收用户选择的参数直接调用） */
async function joinRoom(params: {
  addid: string,
  roomfrom: string,
  handleid: string,
  sessionname: string,
  userxuid: string
}) {
  const res = await fetch('https://api.miaaoo.com/joinv2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiversion: 2,
      joininformation: params
    })
  })
  const data = await res.json()
  if (!res.ok) throw new JoinError(data.code, data.message_zh_CN)
  return data
}

// ───── UI 侧组合调用示例 ─────
async function handleUserJoinRoom(
  selectedRoom: RoomItem,
  selectedAccountId: string,
  userXuid: string
) {
  return joinRoom({
    addid: selectedAccountId,
    roomfrom: selectedRoom.roomfrom,
    handleid: selectedRoom.id,
    sessionname: selectedRoom.sessionRef.name,
    userxuid: userXuid
  })
}
```

---

## 4. /accountv2

### 请求

```
GET https://api.miaaoo.com/accountv2
```

### 响应 200

```ts
Array<{
  id: string            // 账号 ID，如 "4", "5", "6", "7", "8"
  name: string          // Xbox Gamertag
  canaddfriends: boolean // 是否可在Minecraft中添加好友或者在Xbox关注
}>
```

### 当前账号列表

| id | name | canaddfriends |
| 8 | MCLobby26 | true |

### 代码示例

```ts
async function getAccounts() {
  const res = await fetch('https://api.miaaoo.com/accountv2')
  return await res.json() as AccountInfo[]
}
```

---

## 5. /refreshFollowers

### 请求

```
GET https://api.miaaoo.com/refreshFollowers
```

### 响应码

| 状态码 | 说明 |
|--------|------|
| 200 | 至少一个账号刷新成功 |
| 206 | 10 秒内已刷过，跳过（限流） |
| 502 | 部分账号拉取失败 |
| 500 | 服务器错误 |

### 限流
**由于后端设计仍有缺陷，请求后请无视响应代码。**
10 秒全局锁，超限返回 206（空响应体）。

### 代码示例

```ts
async function refreshFollowers(): Promise<boolean> {
  const res = await fetch('https://api.miaaoo.com/refreshFollowers')
  return res.status === 200  // true=成功刷新, false=无需刷新或失败
}
```

---

---

## 7. /roominfo

### 请求

```
GET https://api.miaaoo.com/roominfo?session={sessionName}&roomfrom={id}
```

### 参数

| 参数 | 位置 | 必需 | 说明 |
|------|------|------|------|
| `session` | query | 是 | sessionRef.name（/listv2 返回） |
| `roomfrom` | query | 是 | 账号 ID |

### 响应 200

```ts
{
  members: {
    [index: string]: {              // 成员索引 "0", "1", ...
      joinTime: string
      constants: {
        system: { xuid: string, index: number }
      }
      properties: {
        system: { active: boolean, connection: string }
      }
      gamertag: string               // 玩家 Gamertag
      activeTitleId: string
    }
  }
  membersInfo: {
    count: number
    accepted: number
    active: number
  }
  properties: {
    custom: {
      hostName: string
      ownerId: string
      version: string
      worldName: string
      worldType: string
      MemberCount: number
      MaxMemberCount: number
      BroadcastSetting: number
      isHardcore: boolean
      TransportLayer: number
      OnlineCrossPlatformGame: boolean
    }
  }
  startTime: string
  correlationId: string
}
```

### 代码示例

```ts
async function getRoomInfo(session: string, roomfrom: string) {
  const url = `https://api.miaaoo.com/roominfo?session=${encodeURIComponent(session)}&roomfrom=${roomfrom}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`roominfo error: ${res.status}`)
  return await res.json()
}
```

---

## 8. /profile

### 请求

```
GET https://api.miaaoo.com/profile?gt={gamertag}
GET https://api.miaaoo.com/profile?xuid={xuid}
```

### 参数（二选一）

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `gt` | string | 二选一 | Xbox Gamertag |
| `xuid` | string | 二选一 | XUID（16 位数字） |

两个参数**不能同时存在**。

### 响应 200

```ts
{
  profileUsers: Array<{
    id: string                  // XUID
    hostId: string
    settings: Array<{
      id: "GameDisplayPicRaw" | "Gamertag" | "GameDisplayName"
      value: string
    }>
    isSponsoredUser: boolean
  }>
}
```

### 错误

| 状态码 | 条件 |
|--------|------|
| 400 | gt 和 xuid 均未提供，或同时提供 |
| 500 | Xbox API 调用失败 |

### 代码示例

```ts
async function getProfile(by: { gt?: string, xuid?: string }) {
  const params = new URLSearchParams()
  if (by.gt) params.set('gt', by.gt)
  if (by.xuid) params.set('xuid', by.xuid)
  const res = await fetch(`https://api.miaaoo.com/profile?${params}`)
  if (!res.ok) throw new Error(`profile error: ${res.status}`)
  return await res.json()
}
```

---

## 9. /getxuid

### 请求

```
GET https://api.miaaoo.com/getxuid?gametag={gamertag}
```

### 参数

| 参数 | 必需 | 说明 |
|------|------|------|
| `gametag` | 是 | Xbox Gamertag |

### 成功响应 200

直接返回 **纯文本** 16 位数字 XUID（非 JSON）。

### 错误

| 状态码 | 条件 |
|--------|------|
| 400 | gametag 缺失 |
| 404 | 用户未找到 |
| 500 | 服务器错误 |

### 代码示例

```ts
async function getXuid(gametag: string): Promise<string> {
  const res = await fetch(`https://api.miaaoo.com/getxuid?gametag=${encodeURIComponent(gametag)}`)
  if (!res.ok) throw new Error(`getxuid error: ${res.status}`)
  return await res.text()  // 注意是 text 不是 json
}
```

---

> MCP 文档版本：v2.0.0 · 适用于对接代码自动生成 · 2026-06-02
