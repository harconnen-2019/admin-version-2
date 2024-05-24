type LogFunction = (message?: unknown, ...optionalParameters: unknown[]) => void;

interface Log {
  log: LogFunction;
  warn: LogFunction;
  error: LogFunction;
}

type LogLevel = 'log' | 'warn' | 'error';

const LOG_LEVEL: LogLevel = process.env.NODE_ENV === 'production' ? 'error' : 'log';

/**
 * Пустой объект
 */
function NO_OP() {
  /* document why this function 'NO_OP' is empty */
}

class ConsoleLogger implements Log {
  readonly log: LogFunction;
  readonly warn: LogFunction;
  readonly error: LogFunction;

  constructor(options: { level: LogLevel }) {
    const { level } = options ?? {};

    if (['log', 'warn', 'error'].includes(level)) {
      if (level === 'error') {
        this.log = NO_OP;
        this.warn = NO_OP;
        this.error = console.error.bind(console);
      } else if (level === 'warn') {
        this.log = NO_OP;
        this.warn = console.warn.bind(console);
        this.error = console.error.bind(console);
      } else {
        this.log = console.log.bind(console);
        this.warn = console.warn.bind(console);
        this.error = console.error.bind(console);
      }
    } else {
      throw new Error(`Недопустимый уровень логирования: ${level}`);
    }

    // if (level === 'error') {
    //   this.log = NO_OP;
    //   this.warn = NO_OP;
    //   this.error = console.error.bind(console);
    // } else if (level === 'warn') {
    //   this.log = NO_OP;
    //   this.warn = console.warn.bind(console);
    //   this.error = console.error.bind(console);
    // } else {
    //   this.log = console.log.bind(console);
    //   this.warn = console.warn.bind(console);
    //   this.error = console.error.bind(console);
    // }
  }
}

/**
 * Вывод логов в консоль с настройками в DEV режиме
 * В режиме DEV показывает все логи
 * В режиме PROD только уровня "error"
 */
export const Log = new ConsoleLogger({ level: LOG_LEVEL });
