var Crawler = function (object, regex, parsed) {
  this.object = object;
  this.regex = regex;
  this.parsed = parsed || [];
  this.paths = [];
};

Crawler.prototype.isArray = function (value) {
  return value &&
  typeof value === 'object' &&
  typeof value.length === 'number' &&
  typeof value.splice === 'function' &&
  !(value.propertyIsEnumerable('length'));
};

Crawler.prototype.type = function (item) {
  if (this.isArray(item)) {
    return "array";
  } else {
    return typeof item;
  }
};

Crawler.prototype.unparsed = function (object) {
  return this.parsed.indexOf(object) === -1;
};

Crawler.prototype.parseArray = function (pathRoot, ary) {
  var indexes = [];
  for (var i = 0; i < ary.length; i++) {
    if (this.ary[i].match(this.regex)) {
      indexes.push(i);
    }
  }
  this.paths.concat(indexes.map(function (index) {
    return pathRoot + "[" + index + "]";
  }));
};

Crawler.prototype.parseString = function (pathRoot, str) {
  if (str.match(this.regex)) {
    this.paths.push(pathRoot);
  }
};


// Crawler.prototype.delegate = function (object) {
//   switch (this.type(object)) {
//     case "array":
//       this.parseArray
//
//   }
// };




// var objectSearch = function (object, regex) {
//   // debugger
//   // var parsedItems = [];
//   var paths = [];
//
//   if (parsedItems.indexOf(object) === -1) {
//     parsedItems.push(object);
//     for (var name in object) {
//       if (parsedItems.indexOf(object[name]) === -1) {
//         parsedItems.push(object[name]);
//         try {
//
//           var pathRoot = name;
//
//           if (isArray(object[name])) {
//             var indexes = parseArray(object[name], regex);
//
//             for (var i = 0; i < indexes.length; i++) {
//               paths.push(pathRoot + "[" + indexes[i] + "]");
//             }
//
//           } else if (typeof object[name] === 'object') {
//             var nestedPaths = objectSearch(object[name], regex);
//
//             if (nestedPaths && nestedPaths.length) {
//               for (var i = 0; i < nestedPaths.length; i++) {
//                 paths.push(pathRoot + '.' + nestedPaths[i]);
//               }
//             }
//           } else if (typeof object[name] === 'function') {
//             continue;
//           } else if ((object[name]).match(regex)) {
//             paths.push(name);
//           } else {
//             continue;
//           }
//
//
//         } catch (e) {
//           continue;
//         }
//       }
//     }
//   }
//   return paths;
// };
//
