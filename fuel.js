// The fuel meter.
const fuelTank = document.createElement('div');
fuelTank.setAttribute('class', 'fuel-meter');
const fuelLabel = document.createElement('label');
fuelLabel.setAttribute('for', 'fuel');
fuelLabel.innerHTML = 'Fuel:';
fuelTank.appendChild(fuelLabel);
const fuelMeter = document.createElement('meter');
fuelMeter.setAttribute('id', 'fuel');
fuelMeter.setAttribute('min', '0');
fuelMeter.setAttribute('max', '100');
fuelMeter.setAttribute('low', '33');
fuelMeter.setAttribute('high', '66');
fuelMeter.setAttribute('optimum', '80');
fuelMeter.setAttribute('title', 'Fuel %');
fuelMeter.setAttribute('value', '100');
fuelTank.appendChild(fuelMeter);

/* =====================================================
    FUEL METER
   ===================================================== */
const fuelControl = (() => {
  // Set increment/decrement value for correct/incorrect answer
  const _fuelChangeCorrect = 12;
  const _fuelChangeIncorrect = 25;
  let isFuelEmpty = false;

  let _fuelMeterValue = fuelMeter.value;

  const _fuelMeterMin = fuelMeter.min;
  const _fuelMeterMax = fuelMeter.max;

  // Decrease fuel for correct answer
  const fuelDecCorrect = () => {
    if (_fuelMeterValue - _fuelChangeCorrect <= _fuelMeterMin) {
      isFuelEmpty = true;
      fuelMeter.value = _fuelMeterMin;
      return true;
    }
    _fuelMeterValue -= _fuelChangeCorrect;
    fuelMeter.value = _fuelMeterValue;
  };

  // Decrease fuel for correct answer
  const fuelDecIncorrect = () => {
    if (_fuelMeterValue - _fuelChangeIncorrect <= _fuelMeterMin) {
      isFuelEmpty = true;
      fuelMeter.value = _fuelMeterMin;
      return true;
    }
    _fuelMeterValue -= _fuelChangeIncorrect;
    fuelMeter.value = _fuelMeterValue;
  };

  const getFuelValue = () => _fuelMeterValue;

  const checkFuelEmpty = () => isFuelEmpty;

  return {
    fuelDecCorrect,
    fuelDecIncorrect,
    getFuelValue,
    checkFuelEmpty,
  };
})();

export { fuelTank, fuelControl };
