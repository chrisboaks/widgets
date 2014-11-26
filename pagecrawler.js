// function objectSearch(object, regex) {
//   // Your code here ...
//   // Return the path to every field within object that matches regex
// }

var a = {
  b: "apple",
  c: {
    d: "banana",
    e: ["grape", "APPLE"]
  }
};
//
// objectSearch(a, /apple/i) // should return ["b", "c.e[1]"]

www.newegg.com/Product/Product.aspx?Item=N82E16822178327
objectSearch(window, /Seagate/i);
objectSearch(window, /N82E16822178327/i);
www.sears.com/dyson-dc65-multi-floor-upright-vacuum/p-02039265000P?adCell=pvt_1_1
objectSearch(window, /Dyson/i);
objectSearch(window, /205497\-01/i);
www.walmart.com/ip/Samsung-PN64H5000AFXZA-64-1080p-600Hz-Plasma-HDTV/36156327
objectSearch(window, /Dyson/i);
objectSearch(window, /TVs/i);


// test
var objectSearch = function (object, regex) {
  window.parsedItems = window.parsedItems || [];
  var paths = [];

  for (var name in object) {
    if (window.parsedItems.indexOf(object[name]) !== -1) {
      return;
    } else {
      window.parsedItems.push(object[name]);
    }
  }
    console.log('ur here');

}

// checked.
var objectSearch = function (object, regex) {
  var paths = [];
  for (var name in object) {
    if (typeof object[name] === 'object') {
      var pathRoot = name;
      var nestedPaths = objectSearch(object[name], regex);
      for (var i = 0; i < nestedPaths.length; i++) {
        paths.push(pathRoot + '.' + nestedPaths[i]);
      }
    } else if (object[name].match(regex)) {
      paths.push(name);
    }
  }
  return paths;
};

// master
objectSearch(window, /Seagate/i);

var parsedItems = [];

var objectSearch = function (object, regex, bye) {
  var paths = [];

  if (parsedItems.indexOf(object) === -1 || bye) {
    parsedItems.push(object);
    for (var name in object) {
      if (parsedItems.indexOf(object[name]) === -1) {
        parsedItems.push(object[name]);
        try {

          var pathRoot = name;

          if (isArray(object[name])) {
            // parsedItems.push(object[name]);
            var indexes = parseArray(object[name], regex);

            for (var i = 0; i < indexes.length; i++) {
              paths.push(pathRoot + "[" + indexes[i] + "]");
            }

          } else if (typeof object[name] === 'object') {
            // parsedItems.push(object[name]);
            var nestedPaths = objectSearch(object[name], regex, true);


            for (var i = 0; i < nestedPaths.length; i++) {
              paths.push(pathRoot + '.' + nestedPaths[i]);
            }

          } else if (regex.test(object[name])) {
            // parsedItems.push(object[name]);
            // console.log(object[name]);
            paths.push(name);
          } else {
            // parsedItems.push(object[name]);
          }
        } catch (e) {
          continue;
        }
      }
    }
  }
  return paths;
};

//  isArray code from JavaScript: The Good Parts, p. 61
var isArray = function (value) {
  return value &&
  typeof value === 'object' &&
  typeof value.length === 'number' &&
  typeof value.splice === 'function' &&
  !(value.propertyIsEnumerable('length'));
};

// checked.
var parseArray = function (ary, regex) {
  var indexes = [];
  for (var i = 0; i < ary.length; i++) {
    if (ary[i].match(regex)) {
      indexes.push(i);
    }
  }
  return indexes;
};
