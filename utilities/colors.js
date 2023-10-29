const c = require('chalk');

module.exports = {

  orange(content) {
    return `\u001b[38;5;208;1m${content}\u001b[0m`
  },
  lightOrange(content) {
    return `\u001b[38;5;214;1m${content}\u001b[0m`;
  },
  lighterBlue(content) {
    return `\u001b[38;5;117;1m${content}\u001b[0m`;
  },
  teal(content) {
    return `\u001b[38;5;44;1m${content}\u001b[0m`
  },
  brightBlue(content) {
    return `\u001b[38;5;45;1m${content}\u001b[0m`
  },
  gold(content) {
    return `\u001b[38;5;220;1m${content}\u001b[0m`
  },
  yellow2(content) {
    return `\u001b[38;5;11;1m${content}\u001b[0m`
  },
  red(content) {
    return c.red(content);
  },
  yellow(content) {
    return c.yellow(content);
  },
  green(content) {
    return c.green.bold(content);
  },
  white(content) {
    return c.white.italic(content);
  },
  blue(content) {
    return c.blueBright.italic(content);
  },
  cyan(content) {
    return c.cyan.italic(content);
  },
  magenta(content) {
    return c.magentaBright.bold(content);
  },
  gray(content) {
    return c.gray.italic(content);
  }
}