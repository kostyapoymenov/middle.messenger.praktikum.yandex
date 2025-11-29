type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is PlainObject | unknown[] {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (lhs === rhs) {
    return true;
  }

  if (isArrayOrObject(lhs) && isArrayOrObject(rhs)) {
    if (isArray(lhs) !== isArray(rhs)) {
      return false;
    }

    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);

    if (lhsKeys.length !== rhsKeys.length) {
      return false;
    }

    for (const key of lhsKeys) {
      const lhsValue = (lhs as PlainObject)[key];
      const rhsValue = (rhs as PlainObject)[key];

      if (isArrayOrObject(lhsValue) && isArrayOrObject(rhsValue)) {
        if (isEqual(lhsValue, rhsValue)) {
          continue;
        }
        return false;
      }

      if (lhsValue !== rhsValue) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export default isEqual;
