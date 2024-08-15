import DailyRotateFile = require('winston-daily-rotate-file');
export class FileTransport {
  static create() {
    return new DailyRotateFile({
      dirname: 'logs',
      filename: 'application-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });
  }
}
