export default class UpgradeState {
  private _currentCost: number;
  private _costMultiplier: number;

  private _level: number = 0;

  private _increment: number;
  private _incrementUpgradeBy: number;

  constructor(
    startingCost: number,
    costMultiplier: number,
    startingIncrement: number,
    incrementUpgrade: number
  ) {
    this._currentCost = startingCost;
    this._costMultiplier = costMultiplier;
    this._increment = startingIncrement;
    this._incrementUpgradeBy = incrementUpgrade;
  }

  public upgrade(currentBalance: number): boolean {
    if (this._currentCost > currentBalance) {
      return false;
    }

    this._level += 1;
    this._currentCost = Math.ceil(this._currentCost * this._costMultiplier);
    //rounding due to floating-point arithmetic
    this._increment = Math.round((this._increment + this._incrementUpgradeBy) * 10) / 10;
    return true;
  }

  //returns upgrade cost
  public get currentCost(): number {
    return this._currentCost;
  }

  //returns at what level is the upgrade at.
  public get level(): number {
    return this._level;
  }

  //returns the increment to balance
  public get increment() : number {
    return this._increment;
  }

}
