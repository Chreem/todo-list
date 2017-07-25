let cons = Object.create(null);

function Constructor(name, year) {
    this.name = name;
    this.year = year;
}

Constructor.prototype.toString = function () {
    return this.name + ' ' + this.year;
}

export default Constructor