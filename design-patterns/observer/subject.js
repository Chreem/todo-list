import ObserverList from './observer-list.js'

function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function (observer) {
    this.observers.Add(observer);
}

Subject.prototype.RemoveObserver = function (observer) {
    this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0))
}

Subject.prototype.Notify = function (context) {
    let observerCount = this.observers.Count();
    for (let i = 0; i < observerCount; i++) {
        this.observers.Get(i).Update(context);
    }
}

export default Subject