/* eslint-disable */
/**
 * This class works like a watchdog timer, if it's not reset before timer finishes
 * it'll trigger a triggerFcn().
 * @argument timer integer, defaults to 100ms.
 * @argument triggerFcn function triggered when timer finishes.
 * @method start starts the timer.
 * @method cancel clears the timeout.
 * @method reset(timer) re-starts the timer, preventing triggerFcn execution.
 * If timer is provided it's used to set the new timeout
 *
 * @example
 * const wd = new _Watchdog(5 * 1000, hidePlayerUI);
 * const postpone = _Func.debounce(wd.reset());
 * const eL = document.addEventListener('mousemove', postpone);
 * wd.start();
 */
export default class _Watchdog {
  constructor(timer, triggerFcn, {once} = {}) {
    const defaultFcn = () => {
      this.failed = true;
      this.triggerCount += 1;
      console.log('Watchdog: Trigger function not provided.');
    };
    this.failed = false; // used for testing purposes.
    this.triggerCount = 0; // Trigger count.
    this.timer = typeof timer === 'number' ? timer : 100;
    this.once = typeof once === 'boolean' ? once : false;
    this.triggerFcn =
      typeof triggerFcn === 'function' ? triggerFcn : defaultFcn;
  }

  start(newTimer) {
    if (this.once && this.triggerCount > 0) {
      return;
    }
    const timer = !newTimer ? this.timer : newTimer;
    this.countdown = setTimeout(() => {
      this.triggerCount += 1;
      this.triggerFcn();
    }, timer);
  }

  cancel() {
    if (this.countdown) {
      clearTimeout(this.countdown);
    }
  }

  reset(newTimer) {
    this.cancel();
    this.start(newTimer);
  }
}
