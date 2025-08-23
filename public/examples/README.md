# 示例：USDT 发行（钱包 hex-first 调用）

本目录仅保留一个示例，演示如何用 Cardity 语言编写 USDT-like 协议并通过钱包以 hex-first 方式部署与调用。

- 协议源码：`08_usdt_like.car`
- 钱包演示：`10_wallet_invoke_demo/`（一键生成部署/调用 hex 与最小 envelope）

在线文档与示例聚合请见：[Cardity 示例](https://cardity.org/examples/?lang=zh)

## 一键生成部署/调用数据

```bash
bash examples/10_wallet_invoke_demo/generate.sh
```

生成目录：`examples/10_wallet_invoke_demo/out`
- `usdt.carc` / `usdt.carc.hex` / `usdt.carc.b64`
- `deploy.envelope.json`：`{ p:"cardity", op:"deploy", module, version, hex, carc_b64 }`
- `issue.invoke.hex`：`USDTLikeToken.issue(1000000)` 的调用 hex
- `invoke_issue.envelope.json`：`{ p:"cardity", op:"invoke", module, method, args, hex }`

## DApp 侧（钱包注入）调用示例

```html
<script>
async function deployFromB64() {
  const b64 = await (await fetch('/examples/10_wallet_invoke_demo/out/usdt.carc.b64')).text();
  const res = await window.dogeuni.cardityDeploy({ carc_b64: b64, module: 'USDTLikeToken', version: '1.0.0' });
  console.log('deploy txid:', res?.txid || res);
}

async function issueOneMillion() {
  const res = await window.dogeuni.cardityInvoke({ module: 'USDTLikeToken', method: 'issue', args: [1000000] });
  console.log('invoke txid:', res?.txid || res);
}
</script>
```

## 说明
- 采用 hex-first 上链；ABI 仅用于链下表单与校验，不上链。
- 大文件自动走 commit/reveal（钱包内置，对齐 dogeuni-sdk 流程）。


