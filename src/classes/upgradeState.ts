export default class UpgradeState {
  private _currentCost: number;
  private _costMultiplier: number;

  private _level: number = 0;

  private _increment: number;
  private _incrementUpgradeBy: number;
  private _startingCost: number;
  private _startingIncrement: number;
  constructor(
    startingCost: number,
    costMultiplier: number,
    startingIncrement: number,
    incrementUpgrade: number
  ) {
    this._currentCost = startingCost;
    this._startingCost = startingCost; //needed for loading game
    this._costMultiplier = costMultiplier;
    this._increment = startingIncrement;
    this._startingIncrement = startingIncrement; //needed for loading game
    this._incrementUpgradeBy = incrementUpgrade;
  }

  public upgrade(currentBalance: number): boolean {
    if (this._currentCost > currentBalance) {
      return false;
    }

    this._level += 1;
    this._currentCost = Math.ceil(this._currentCost * this._costMultiplier);
    //rounding due to floating-point arithmetic
    this._increment = Math.round((this._increment + this._incrementUpgradeBy) * 100) / 100;
    return true;
  }

  public loadUpgrade(level: number) {
    this._level = level;
    this._currentCost = this._startingCost
    for (let index = 0; index < level; index++) {
      this._currentCost = Math.ceil(this._currentCost * this._costMultiplier)
    }
    this._increment = Math.round((this._startingIncrement + (this._incrementUpgradeBy * level)) * 100 ) / 100;
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

  public get incrementAdd() : number {
    return this._incrementUpgradeBy;
  }

}
