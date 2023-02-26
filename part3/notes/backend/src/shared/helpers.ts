export function haveTheSameType<T extends Object>(object1: T, object2: T): object2 is T {
  for (let property in object1) {
    if ((!(property in object2) || typeof object1[property] !== typeof object2[property]) ||
      typeof object1[property] === "object" && !haveTheSameType(object1[property], object2[property])) {
      
      return false;
    }
  }

  return true;
}