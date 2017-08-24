function getBaseType(target) {
    return Object.prototype.toString.apply(target).slice(8, -1);
}

function eachObj(obj, fn) {
    for(var key in obj) {
        fn(obj[key], key, obj);
    }
}

function getKeys(obj, sort) {
    var keys = [];

    eachObj(obj, function(value, key) {
        keys.push(key);
    });

    return keys.sort(sort);
}

function extend(obj, target) {
    eachObj(target, function(value, key) {
        obj[key] = value;
    });

    return obj;
}