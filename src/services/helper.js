/* eslint-disable no-unused-vars */
/////////////////////////////
// setLocalStorageItem()
/////////////////////////////
export const setLocalStorageItem = (storageKey, state) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
};

/////////////////////////////
// getLocalStorageItem()
/////////////////////////////
export const getLocalStorageItem = (storageKey) => {
  const savedState = localStorage.getItem(storageKey);
  try {
    if (!savedState) {
      return undefined;
    }
    return JSON.parse(savedState ?? '{}');
  } catch (e) {
    return undefined;
  }
};

/////////////////////////////
// addLeadingZeros
/////////////////////////////
export const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

/////////////////////////////
// getPercentage
/////////////////////////////
export const getPercentage = (score, maxScore) => {
  return ((score / maxScore) * 100).toFixed(2);
};
