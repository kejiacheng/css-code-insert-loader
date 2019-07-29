# css-code-insert-loader
主要功能：在指定的css预处理器（sass,less等）上的头部或特定地方注入通用代码

## 安装

```js
npm i -D css-code-insert-loader
```

## 用法
将该loader放于各css预处理器loader之后，下面以sass为例

```js
{
  test: /\.scss$/,
  include: [path.resolve(__dirname, './src')],
  use: [
    'style-loader',
    'css-loader',
    'sass-loader',
    {
      loader: 'css-code-insert-loader',
      options: {
        include: [path.resolve(__dirname, './src/container')],
        exclude: [path.resolve(__dirname, './src/container/xx')]
        data: function ({ filePath }) {
          return '$blue: blue;'
        }
      }
    }
  ]
}
```

如上例所写，该loader将会给container目录下(排除container/xx目录)的所有后缀为scss的文件头部注入$blue: blue;的代码。
（注意：当代码中含有/* warning css-code-insert */的注释后，代码将不再注入头部，而将会替换注释）

## options下可使用属性

<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>默认值</th>
  </tr>
  <tr>
    <th>include</th>
    <th>选择需要注入代码的目录或者文件</th>
    <th>Array | String</th>
    <th>该规则下的所有文件</th>
  </tr>
  <tr>
    <th>exclude</th>
    <th>选择排除注入代码的目录或者文件</th>
    <th>Array | String</th>
    <th>无</th>
  </tr>
  <tr>
    <th>data</th>
    <th>填写需要插入的代码</th>
    <th>Function | String</th>
    <th>无</th>
  </tr>
</table>