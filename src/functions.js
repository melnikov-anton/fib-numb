
/**
 *Functions module
 * @module Functions
 * @author Anton Melnikov
 */

/**
 * getFibMember - Calculates the Fibonacci sequence
 *
 * @param  {number} member - Number of a member Fibonacci sequence
 * @returns {number}        - Fibonacci number
 */
function getFibMember(member) {
  if (member === 0) {
    return 0;
  }
  const fibMemb = [];
  for (let i = 0; i < member; i += 1) {
    if (i === 0) {
      fibMemb[i] = 0;
    } else if (i === 1) {
      fibMemb[i] = 1;
    } else {
      fibMemb[i] = fibMemb[i - 2] + fibMemb[i - 1];
    }
  }
  return fibMemb[member - 1] === null ? 0 : fibMemb[member - 1];
}


/**
 * getClientIP - Extracts IPv4 address from req.ip (from ExpressJS)
 *
 * @param  {string} rawIP - String from req.ip (from ExpressJS)
 * @returns {string}       - IPv4 address
 */
function getClientIP(rawIP) {
  let ip = rawIP;
  ip = ip.toString();
  ip = ip.split(':');
  ip = ip[ip.length - 1];
  ip = ip === '1' ? '127.0.0.1' : ip;
  return ip;
}

module.exports = {
  getFibMember,
  getClientIP,
};
