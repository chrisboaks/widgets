var Crawler = function (object, regex, parsed, errors) {
  this.object = object;
  this.regex = regex;
  this.parsed = parsed || [];
  this.paths = [];
  // debugger;
};

Crawler.prototype.isArray = function (value) {
  return value &&
  typeof value === 'object' &&
  typeof value.length === 'number'
  // typeof value.splice === 'function' &&
  // !(value.propertyIsEnumerable('length'));
};

Crawler.prototype.type = function (item) {
  if (this.isArray(item)) {
    return "array";
  } else if (item === null) {
    return "null";
  } else {
    return typeof item;
  }
};

Crawler.prototype.unparsed = function (object) {
  return this.parsed.indexOf(object) === -1;
};

Crawler.prototype.parseArray = function (ary, pathRoot) {
  this.parsed.push(ary);

  for (var i = 0; i < ary.length; i++) {
    if (ary[i].match(this.regex)) {
      this.paths.push(pathRoot + "[" + i + "]");
    }
  }
};

Crawler.prototype.parseString = function (str, pathRoot) {
  if (str.match(this.regex)) {
    this.paths.push(pathRoot);
  }
};

Crawler.prototype.parseObject = function (obj, pathRoot) {
  if (Object.keys(obj).indexOf(pathRoot) === -1) {
    var subcrawler = new Crawler(obj, this.regex, this.parsed);
    var subpaths = subcrawler.crawl();
    for (var i = 0; i < subpaths.length; i++) {
      this.paths.push(pathRoot + "." + subpaths[i]);
    }
  }
};

Crawler.prototype.parseOther = function (other) {
  this.parsed.push(other);
  console.log("Could not parse", other, "type:", this.type(other));
};

Crawler.prototype.crawl = function () {
  if (this.object && this.unparsed(this.object)) {
    this.parsed.push(this.object);
    for (var name in this.object) {
      if (this.unparsed(this.object[name]) && this.object.hasOwnProperty(name)) {
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
          case "number":
          case "function":
          case "boolean":
          case "null":
            this.parsed.push(this.object[name]);
            break;
          default:
            this.parseOther(this.object[name], name);
            break;
          }
        } catch(e) {
          this.errorCount++;
          console.log("Error:", e);
        }
      }
    }
  }
  // console.log(this.parsed.length);
  return this.paths;
};

/////////////////////////////

function objectSearch(object, regex) {
  var c = new Crawler(object, regex);
  return c.crawl();
}

/////////////////////////////

objectSearch(window, /Seagate/i);

/////////////////////////////

var a = {
  b: "apple",
  c: {
    d: "banana",
    e: ["grape", "APPLE"]
  }
};
a.d = a;

objectSearch(a, /apple/i);


var c = new Crawler(a, /apple/i);
c.crawl();
