const util = require('util');

class Log {
  static format(level, message, data) {
    const timestamp = new Date().toISOString();
    let log = `[${timestamp}][${level}]: ${message}`;

    if (data !== undefined) {
      // Pretty-print objects and errors
      if (data instanceof Error) {
        log += `\n${data.stack}`;
      } else if (typeof data === 'object') {
        log += `\n${util.inspect(data, { depth: 5, colors: false })}`;
      } else {
        log += ` ${data}`;
      }
    }

    return log;
  }

  static info(message, data) {
    console.log(this.format('INFO', message, data));
  }

  static warn(message, data) {
    console.warn(this.format('WARN', message, data));
  }

  static error(message, error) {
    console.error(this.format('ERROR', message, error));
  }
}

module.exports = Log;
