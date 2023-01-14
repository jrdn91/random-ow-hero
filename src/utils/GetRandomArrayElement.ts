function GetRandomArrayElement<T = any>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default GetRandomArrayElement;
