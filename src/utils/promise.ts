const waitForMultipleActions = async (...actions: Promise<any>[]) => {
  return await Promise.all(actions);
};

export default waitForMultipleActions;
