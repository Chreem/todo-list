function ObserverList() {
    this.observerlist = []
}

ObserverList.prototype.Add = function (obj) {
    return this.observerlist.push(obj)
}

ObserverList.prototype.Empty = function () {
    this.observerlist = []
}

ObserverList.prototype.Count = function () {
    return this.observerlist.length
}

ObserverList.prototype.Get = function (index) {
    if (index > -1 && index < this.observerlist.length) {
        return this.observerlist[index]
    }
}

ObserverList.prototype.Insert = function (obj, index) {
    let point = -1;
    if (index == 0) {
        this.observerlist.unshift(obj);
        point = index;
    } else if (index === this.observerlist.length) {
        this.observerlist.push(obj);
        point = index;
    } else {
        this.observerlist.splice(index, 0, obj);
    }

    return point;
}

ObserverList.prototype.IndexOf = function (obj, startIndex) {
    let i = startIndex,
        point = -1;
    for (; i < this.observerlist.length; i++) {
        if (this.observerlist[i] === obj) {
            point = i;
        }
    }
    return point;
}

ObserverList.prototype.RemoveIndexAt = function (index) {
    if (index === 0) {
        this.observerlist.shift();
    } else if (index === this.observerlist.length - 1) {
        this.observerlist.pop();
    } else {
        this.observerlist.splice(index, 1);
    }
}

export default ObserverList