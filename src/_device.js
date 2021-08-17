const isDefined = (obj) => obj !== undefined;

export const getUserAgent = () => isDefined(window) ? window.navigator.userAgent : '';

export const isMobile = (userAgent = this.getUserAgent()) => /mobile/i.test(userAgent);

export const isPhone = (userAgent = this.getUserAgent()) => this.isMobile(userAgent) && !this.isPad(userAgent);

export const isPad = (userAgent = this.getUserAgent()) => /pad/i.test(userAgent);

export const isAndroid =(userAgent = this.getUserAgent()) => /Android/i.test(userAgent);

export const isiOS =(userAgent = this.getUserAgent()) => this.isiPhone(userAgent) || this.isiPad(userAgent) || this.isiPod(userAgent);

export const isiPhone =(userAgent = this.getUserAgent()) => /iPhone/.test(userAgent) && !/iPod/.test(userAgent);

export const isiPad =(userAgent = this.getUserAgent()) => /iPad/.test(userAgent);

export const isiPod =(userAgent = this.getUserAgent()) => /iPod/.test(userAgent);