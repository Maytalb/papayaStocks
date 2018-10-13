export default class Stock {
    name: string;
    symbol: string;
    startOfCommerce: Date;
    currentPrice: number;
    isFollowing: boolean = false;

    constructor() { }
}