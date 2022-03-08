const timeout = (ms) => new Promise(resolve => {
  setTimeout(resolve, ms);
})


function inc(a) {
  return timeout(3000)
  .then(()=> a + 1)
}

const sum = function (a, b) {
  return timeout(3000)
  .then(()=> (a + b))
};

const max = (a, b) => timeout(3000).then(() => (a > b ? a : b))

const avg = (a, b) => sum(a, b)
  .then(sum =>  sum / 2 );

const obj = {
  name: "Marcus Aurelius",
  split(sep = " ") {
    return timeout(3000).then(()=>this.name.split(sep));
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }

  static of(name) {
    return new Person(name);
  }

  split(sep = " ") {
    return timeout(3000).then(this.name.split(sep));
  }
}

const person = Person.of("Marcus Aurelius");

console.log("1 inc(5) =", inc(5).then((inc) => console.log(inc)));
console.log("2 sum(1, 3) =", sum(1, 3).then((sum) => console.log(sum)));
console.log("3 max(8, 6) =", max(8, 6).then((max) => console.log(max)));
console.log("4 avg(8, 6) =", avg(8, 6).then((avg) => console.log(avg)));
console.log("5 obj.split() =", obj.split().then((split) => console.log(split)));
console.log("6 person.split() =", person.split().then((split) => console.log(split)));
