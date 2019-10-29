export const handler = (order, _, callback) => {
  // this is fake step so we return order immediately
  if (order) callback(null, order);

  callback(undefined);

};
