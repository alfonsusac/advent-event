// src/index.ts
export class AdventCalendar {

  /**
   * Initializes the calendar
   * @param startTime The start time of the calendar
   * @param length The length of the calendar
   */
  constructor(
    readonly startTime: Date,
    readonly length: number = 24,
  ) {
    // validate date
    startTime.toISOString()
    // validate length
    if (length < 1) {
      throw new Error('length must be greater than 0')
    }
    if (typeof length !== 'number' || isNaN(length)) {
      throw new Error('length must be a number')
    }
  }

  /**
   * Checks if a specific day is unlocked. 
   */
  isUnlocked(day: number, currentTime: Date = new Date()): boolean {
    if (day < 1 || day > this.length) {
      throw new Error(`day must be between 1 and ${ this.length + 1 }`)
    }
    return currentTime.getTime() > this.startTime.getTime() + (day - 1) * 24 * 60 * 60 * 1000;
  }

  /**
   * Gets the unlock time for a day (as a timestamp).  
   */
  getTime(day: number) {
    if (day < 1 || day > this.length) {
      throw new Error(`day must be between 1 and ${ this.length + 1 }`)
    }
    return this.startTime.getTime() + (day - 1) * 24 * 60 * 60 * 1000;
  }

  /**
   * Calculates the time remaining until a day is unlocked.  
   */
  getCountdown(day: number, currentTime: Date = new Date()) {
    if (day > this.length) {
      return 0;
    }
    return this.getTime(day) - currentTime.getTime();
  }

  /**
   * Checks if the calendar period is over.  
   */
  isLastDayUnlocked(currentTime: Date = new Date()) {
    return currentTime.getTime() > this.getTime(this.length);
  }

  /**
   * Finds the most recent unlocked day.  
   */
  getLastUnlockedDay(currentTime: Date = new Date()) {
    let day = 1;
    while (this.isUnlocked(day, currentTime)) {
      day++;
      if (day > this.length) {
        return this.length;
      }
    }
    return day - 1;
  }

  /**
   * Gets the number of days left in the advent calendar.
   */
  getRemainingDays(currentTime: Date = new Date()) {
    return this.length - this.getLastUnlockedDay(currentTime);
  }

}