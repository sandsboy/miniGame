# miniGame

微信小游戏原生脚手架。用微信开发者工具打开本仓库根目录即可预览：全屏画布、标题文字，以及一个移动的占位图形。

调试基础库为 `3.18.0`（2026-11-17 版本分布中占比最高的稳定版）。

## 导入项目

1. 安装并打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 选择「导入」，项目目录选本仓库的根目录（包含 `project.config.json` 和 `game.json` 的那一层）。
3. AppID 保持 `touristappid` 即可先用游客模式预览，无需注册。
4. 确认项目类型为小游戏后导入。编译后应看到全屏画布、标题「miniGame」，以及一个上下移动的方块。

## 替换 AppID

正式调试或上传前，把游客 AppID 换成你自己的小游戏 AppID：

1. 在 [微信公众平台](https://mp.weixin.qq.com/) 注册小游戏，于「开发」-「开发管理」-「开发设置」复制 AppID。
2. 打开仓库根目录的 `project.config.json`，把 `"appid"` 从 `touristappid` 改成该 AppID 并保存。
3. 若项目已经导入，在微信开发者工具的「详情」-「基本信息」中核对 AppID。在这里修改会写到本地的 `project.private.config.json`，不会改掉已提交的 `project.config.json`。要让仓库里的配置也换成正式 AppID，仍需修改 `project.config.json`。

`project.private.config.json` 已加入 `.gitignore`，不要提交。

## 目录

- `game.js`：入口，启动主循环。
- `js/main.js`：创建全屏画布、动画循环和触摸占位。
- `js/scene.js`：可替换的占位场景。后续具体玩法只改这个文件。
- `images/`、`audio/`：图片与音频资源目录。
