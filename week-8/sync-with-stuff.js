const timeout = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const data = [1, 2, 3, 4];
const [value, ...rest] = data;
value === 1;
rest === [2, 3, 4];
const data1 = { f: 1, f1: 2 };
const { f, ...rest1 } = data1;
f === 1;
rest1 === { f1: 2 };

/**
 * {
 *  success: true,
 *  value: 1,
 *  value2: 2
 * }
 */

fetch(`https://...`)
  .then(({ success, ...data }) => {
    if (success) {
      // use data
    } else {
      throw new Error(`error string`);
    }
  })
  .catch((error) => {
    console.error(error);
    // do error
  });

const inc = (a) => {
  return new Promise((resolve) => timeout().then(() => resolve(a + 1)));
};

const sum = async (a, b) => {
  await timeout();
  return a + b;
};

const max = async (a, b) => {
  await timeout();
  return a > b ? a : b;
};

const avg = async (a, b) => {
  const s = await sum(a, b);
  await timeout();
  return s / 2;
};

const obj = new Promise((resolve) =>
  resolve({
    name: "Marcus Aurelius",
    async split(sep = " ") {
      await timeout();
      return this.name.split(sep);
    },
  })
);

obj.then((value) => value.split());

class Person {
  constructor(name) {
    this.name = name;
  }

  static async of(name) {
    await timeout();
    return new Person(name);
  }

  async split(sep = " ") {
    await timeout();
    return this.name.split(sep);
  }
}

const main = async () => {
  try {
    const person = await Person.of("Marcus Aurelius");
    console.log("inc(5) =", await inc(5));
    console.log("sum(1, 3) =", await sum(1, 3));
    console.log("max(8, 6) =", await max(8, 6));
    console.log("avg(8, 6) =", await avg(8, 6));
    console.log("person.split() =", await person.split());
    console.log("obj.split() =", await obj.split());
  } catch (error) {}
};

main();
