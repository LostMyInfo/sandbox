// @ts-check
require('dotenv').config();
const { default: axios } = require('axios');
const { yellow, cyan, magenta, red, blue, green, teal, yellow2, brightBlue, orange, white } = require('./colors');
// const mapih = require('mapih');
// const { discord: { guilds } } = new (require('../Api'))();
const lib = require('lib')({ token: process.env.token2 });

/**
* Logs a message to the console, optionally stringifying objects with nested objects.
*
* @param {string} label - The label to use for the log message.
* @param {*} content - The content to log.
* @param {Object} [options] - Additional options for logging.
* @param {boolean} [options.inline=false] - Whether to log the message on a single line.
* @param {boolean} [options.stringify=false] - Whether to stringify arrays as well as objects.
* @returns {void|string} - Nothing is returned.
*/
function log(label, content, options = {}) {
  if (!content) return 'No content'
  const { stringify, inline } = options;
  let newContent = content;

  if (inline) {
    return console.log(`${brightBlue('[')}${orange(label)}${brightBlue(']')}${orange(': [')}${brightBlue(newContent)}${orange(']')}`);
  }
  if (stringify) newContent = JSON.stringify(content, null, 2);
  if (content?.toString() !== '[object Object]' && !stringify) {
    console.log(`${brightBlue('[')}${orange(label)}${brightBlue(']')} ${orange('-')} ${brightBlue('[')}${orange(content.constructor?.name)}${brightBlue(']')} ${brightBlue('[')}${orange(depthOf(content))}${brightBlue(']')}`)
    return console.log(newContent)
  }
  if ((typeof content === 'object' && content !== null && content.toString() === '[object Object]') || stringify) {
    console.log('if ([object Object])')
    newContent = JSON.stringify(content, null, 2);
  } else newContent = newContent;

  console.log([
    `${brightBlue('[')}${orange(label)}${brightBlue(']')} ${orange('-')} ${brightBlue('[')}${orange(content.constructor?.name)}${brightBlue(']')} ${brightBlue('[')}${orange(depthOf(content))}${brightBlue(']')}`,
    // JSON.stringify(count(content), null, 2),
    brightBlue(newContent)
  ].join('\n'));
}


async function start() {
  console.log(
    `${yellow('-'.repeat(58))}\n` + `${yellow(`${'-'.repeat(25)}`)}` + `${brightBlue(' START ')}` + `${yellow(`${'-'.repeat(26)}`)}` + `\n${yellow('-'.repeat(58))}\n`
  );
  let count = await lib.keyvalue.store['@release'].get({
    key: 'counter', defaultValue: '0' });

  await lib.keyvalue.store['@release'].set({
    key: 'counter', value: count + 1 });
  /*
  return lib.discord.channels.messages.create({
    channel_id: '774133713733812275',
    content: `
**Command Usage:** ${count + 1} times
**Memory:** ${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} MB
**CPU:** ${(process.cpuUsage().system/1024/1024).toFixed(2)}%`
  });
  */
}

function end() {
  return console.log(
    `${yellow('-'.repeat(58))}\n` + `${yellow(`${'-'.repeat(26)}`)}` + `${teal(' END ')}` + `${yellow(`${'-'.repeat(27)}`)}` + `\n${yellow('-'.repeat(58))}\n`
  )
}

async function imageToBuffer(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'utf-8');
}

function codeblock(content, stringify, lang = 'json') {
  return stringify
    ? `\`\`\`${lang}\n${JSON.stringify(content, null, 2)}\`\`\``
    : `\`\`\`${lang}\n${content}\`\`\``
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  log,
  start,
  end,
  imageToBuffer,
  codeblock,
  sleep
}