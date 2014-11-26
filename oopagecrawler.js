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

Crawler.prototype.parseArray = function (ary, pathRoot) {
  this.parsed.push(ary);
  var indexes = [];

  for (var i = 0; i < ary.length; i++) {
    if (ary[i].match(this.regex)) {
      indexes.push(i);
    }
  }

  this.paths.concat(indexes.map(function (index) {
    return pathRoot + "[" + index + "]";
  }));
};

Crawler.prototype.parseString = function (str, pathRoot) {
  if (str.match(this.regex)) {
    this.paths.push(pathRoot);
  }
};

Crawler.prototype.parseObject = function (obj, pathRoot) {
  var subcrawler = new Crawler(obj, this.regex, this.parsed);
  var subpaths = subcrawler.crawl();

  this.paths.concat(subpaths.map(function (sub) {
    return pathRoot + "." + sub;
  }));
};

Crawler.prototype.parseOther = function (other) {
  console.log("Could not parse", other, "type:", typeof other);
};

Crawler.prototype.crawl = function () {
  if (this.unparsed(this.object)) {
    this.parsed.push(this.object);

    for (var name in this.object) {
      if (this.unparsed(this.object[name])) {
        try {
          switch (this.type(this.object[name])) {
          case "array":
            this.parseArray(this.object[name], name);
            break;
          case "string":
            this.parseString(this.object[name], name);
            break;
          case "object":
            this.parseObject(this.object[name], name);
            break;
          default:
            this.parseOther(this.object[name], name);
            break;
          }
        } catch(e) {
          console.log("Error:", e);
        }
      }
    }
  }
  return this.paths;
};

var a = {
  b: "apple",
  c: {
    d: "banana",
    e: ["grape", "APPLE"]
  }
};
var c = new Crawler(a, /apple/i);
c.crawl();




// var objectSearch = function (object, regex) {
//   // debugger
//   var parsedItems = [];
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
//           else if (typeof object[name] === 'function') {
//             continue;
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
