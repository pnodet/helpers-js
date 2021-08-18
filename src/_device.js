const isDefined = obj => obj !== undefined;

export const getUserAgent = () =>
  isDefined(window) ? window.navigator.userAgent : '';

export const isMobile = (userAgent = this.getUserAgent()) =>
  /mobile/i.test(userAgent);

export const isPhone = (userAgent = this.getUserAgent()) =>
  this.isMobile(userAgent) && !this.isPad(userAgent);

export const isPad = (userAgent = this.getUserAgent()) =>
  /pad/i.test(userAgent);

export const isAndroid = (userAgent = this.getUserAgent()) =>
  /Android/i.test(userAgent);

export const isiOS = (userAgent = this.getUserAgent()) =>
  this.isiPhone(userAgent) || this.isiPad(userAgent) || this.isiPod(userAgent);

export const isiPhone = (userAgent = this.getUserAgent()) =>
  /iPhone/.test(userAgent) && !/iPod/.test(userAgent);

export const isiPad = (userAgent = this.getUserAgent()) =>
  /iPad/.test(userAgent);

export const isiPod = (userAgent = this.getUserAgent()) =>
  /iPod/.test(userAgent);

/**
 * Client Browser
 * @param {String} agent Useragent
 * @returns {Promise<string>}
 */
export const getBrowser = async agent => {
  const browserList = [
    'MSIE',
    'Trident',
    'Edge',
    'Kaios',
    'Firefox',
    'Opr',
    'Samsungbrowser',
    'YaBrowser',
    'Yowser',
    'Chrome',
    'Safari',
    'Netscape',
    'Maxthon',
    'Konqueror',
    'Mobile',
    'UCBrowser',
    'UCWEB'
  ];
  let theBrowser = 'Other';
  for (let browser of browserList) {
    if (agent.match(new RegExp(browser, 'gmi'))) {
      theBrowser = browser;
      break;
    }
  }
  if (theBrowser === 'MSIE' || theBrowser === 'Trident') {
    return 'Internet Explorer';
  } else if (theBrowser === 'kaios') {
    return 'Kaios Browser';
  } else if (theBrowser === 'Opr' || theBrowser === 'opr') {
    return 'Opera';
  } else if (theBrowser === 'samsungbrowser') {
    return 'Samsung Browser';
  } else if (theBrowser === 'mobile') {
    return 'Handheld Browser';
  } else if (theBrowser === 'UCBrowser' || theBrowser === 'UCWEB') {
    return 'UC Browser';
  } else if (theBrowser === 'YaBrowser' || theBrowser === 'Yowser') {
    return 'Yandex Browser';
  }
  return theBrowser;
};

/**
 * Client OS
 * @param {string} agent Useragent
 * @returns {Promise<string>}
 */
export const getOS = async agent => {
  const osList = {
    'windows nt 10': 'Windows 10',
    'windows nt 6.3': 'Windows 8.1',
    'windows nt 6.2': 'Windows 8',
    'windows nt 6.1': 'Windows 7',
    'windows nt 6.0': 'Windows Vista',
    'windows nt 5.2': 'Windows Server 2003/XP x64',
    'windows nt 5.1': 'Windows XP',
    'windows xp': 'Windows XP',
    'windows nt 5.0': 'Windows 2000',
    'windows me': 'Windows ME',
    win98: 'Windows 98',
    win95: 'Windows 95',
    win16: 'Windows 3.11',
    'macintosh|mac os x': 'Mac OS X',
    mac_powerpc: 'Mac OS 9',
    ubuntu: 'Ubuntu',
    'Red Hat': 'Red Hat',
    android: 'Android',
    linux: 'Linux',
    iphone: 'iPhone',
    ipod: 'iPod',
    ipad: 'iPad',
    blackberry: 'BlackBerry',
    'webos|wos': 'Mobile'
  };
  let theOs = 'Other';
  for (let i in osList) {
    if (agent.match(new RegExp(i, 'gmi'))) {
      theOs = osList[i];
      break;
    }
  }
  return theOs;
};

/**
 * Check Mobile
 * @param {String} agent Useragent
 * @returns {Promise<string>}
 */
export const getMobile = async agent => {
  const mobiles = [
    'kaios',
    'samsung',
    'meego',
    'avantgo',
    'playbook',
    'opera m',
    'symbian',
    'midp',
    'wap',
    'android',
    'bolt',
    'boost',
    'docomo',
    'fone',
    'blazer',
    'hiptop',
    'phone',
    'mini',
    'tablet',
    'iphone',
    'ipod',
    'ipad',
    'blackberry',
    'webos',
    'wos',
    'UCBrowser',
    'UCWEB',
    'mobi'
  ];
  if (agent.match(new RegExp(mobiles.join('|'), 'gmi'))) return 'Mobile';
  return 'Desktop';
};
