function rollPlaceRandom() {
  const chance = Math.random();
  const times = chance > 0.625 ? 2 : 1;
  for (let i = 0; i < times; i++) {
    placeRandom();
  }
}
