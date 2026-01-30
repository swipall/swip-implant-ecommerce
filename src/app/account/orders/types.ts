export enum OrderStatusPaid {
    'paid',
    'partial',
    'not_paid',
};


export enum OrderPaymentType {
    cash = 'cash',
    credit = 'credit',
    transfer = 'transfer',
    credit_card = 'credit_card',
    debit_card = 'debit_card',
    // account_money = 'account_money', (We don't know what this does ¯\_(ツ)_/¯)
    ticket = 'ticket',
    digital_wallet = 'digital_wallet',
    nominal_check = 'nominal_check',
    gift = 'gift',
    all = 'all',
    mixed = 'mixed'
}