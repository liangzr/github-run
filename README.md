# GitHub Run 🏃

Let your contributions graph running!

![](https://ws3.sinaimg.cn/large/006tKfTcgy1g198k0szxej31ks0dwwhy.jpg)

## Setup

**Step 1** 

Fork this repository, and clone YOUR OWN `github-run`

**Step 2** 

Initialize dependecies by using `yarn`，and you need to install `pm2` in advance.

```sh
yarn
sh start.sh
```

## Usage

You can create your own characters by [this site](https://codepen.io/sebdeckers/pen/vOXeKV), and put it in `character.js` file.

### Environment Variables

There are three global environment variables used in the project, you can configure them in your `.bashrc` or `.zshrc`

```sh
export GITHUB_USER=<your github name>
export GITHUB_EMAIL=<your github email>
export GITHUB_DEV_TOKEN=<your personal access token>
```

You can apply a personal access token in [here](https://github.com/settings/tokens)

> Generate contributions graph didn't need one token, but the `notify.sh` script use it to force GitHub update contributions graph immediately

## Problems

- [x] ~~GitHub did not update the contributions graph immediately, so you might see two graph overlay~~
- [ ] You have to run scripts locally to reuse private ssh keys of GitHub

## License

MIT

just for fun 🔥
