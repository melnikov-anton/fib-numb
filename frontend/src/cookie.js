
function getCookies() {
  let rawCookies = document.cookie.split(';');
  let cookie = [];
  let itemArray =[]
  rawCookies.map( (item) => {
    itemArray = item.split('=');
    cookie.push({
      name: itemArray[0],
      value: itemArray[1]
    });
    return true;
  });
  return cookie;
}

function getCookieValue(name) {
  let value = null;
  getCookies().map( (item) => {
    if (item.name === name) value = item.value;
    return true;
  });
  return value;
}

export { getCookies, getCookieValue };
