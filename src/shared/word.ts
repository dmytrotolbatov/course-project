export class Word {
  public id: number;
  public createdAt: number;
  public name: string;
  public translation: string;

  /**
   * @param {any} params
   */
  public constructor(params?: any) {
    for (let key in params) {
      (<any>this)[key] = params[key];
    }
  }
}
