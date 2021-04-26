
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        { id: 1, user_id: 2, package_name: 'Yellow', quantity: 1, sales_date: '2021-01-02', attachment: 'profile/1619245872532.jpg' },
        { id: 2, user_id: 2, package_name: 'Red', quantity: 1, sales_date: '2021-02-02', attachment: null },
        { id: 3, user_id: 3, package_name: 'Yellow', quantity: 1, sales_date: '2021-03-02', attachment: null },
        { id: 4, user_id: 3, package_name: 'Yellow', quantity: 1, sales_date: '2021-01-12', attachment: null },
        { id: 5, user_id: 1, package_name: 'Red', quantity: 1, sales_date: '2021-03-28', attachment: null },
        { id: 6, user_id: 1, package_name: 'Blue', quantity: 1, sales_date: '2021-03-13', attachment: null },
        { id: 7, user_id: 2, package_name: 'Red', quantity: 1, sales_date: '2021-02-24', attachment: null },
        { id: 8, user_id: 1, package_name: 'Yellow', quantity: 1, sales_date: '2021-01-31', attachment: null },
        { id: 9, user_id: 2, package_name: 'Yellow', quantity: 1, sales_date: '2021-02-11', attachment: null },
        { id: 10, user_id: 2, package_name: 'Red', quantity: 1, sales_date: '2021-02-21', attachment: null },
        { id: 11, user_id: 1, package_name: 'Yellow', quantity: 1, sales_date: '2021-03-05', attachment: null },
        { id: 12, user_id: 3, package_name: 'Red', quantity: 1, sales_date: '2021-01-08', attachment: null },
        { id: 13, user_id: 3, package_name: 'Yellow', quantity: 1, sales_date: '2021-03-01', attachment: null },
        { id: 14, user_id: 2, package_name: 'Blue', quantity: 1, sales_date: '2021-03-19', attachment: null },
        { id: 15, user_id: 2, package_name: 'Blue', quantity: 1, sales_date: '2021-02-19', attachment: null },
        { id: 16, user_id: 3, package_name: 'Blue', quantity: 1, sales_date: '2021-01-07', attachment: null },
        { id: 17, user_id: 2, package_name: 'Red', quantity: 1, sales_date: '2021-01-29', attachment: null },
        { id: 18, user_id: 2, package_name: 'Red', quantity: 1, sales_date: '2021-02-25', attachment: null },
        { id: 19, user_id: 3, package_name: 'Yellow', quantity: 1, sales_date: '2021-01-14', attachment: null },
        { id: 20, user_id: 3, package_name: 'Blue', quantity: 1, sales_date: '2021-03-16', attachment: null },
        { id: 21, user_id: 1, package_name: 'Red', quantity: 1, sales_date: '2021-01-22', attachment: null },
        { id: 22, user_id: 2, package_name: 'Blue', quantity: 1, sales_date: '2021-01-28', attachment: null },
        { id: 23, user_id: 3, package_name: 'Blue', quantity: 1, sales_date: '2021-01-06', attachment: null },
        { id: 24, user_id: 2, package_name: 'Red', quantity: 1, sales_date: '2021-03-02', attachment: null },
        { id: 25, user_id: 3, package_name: 'Yellow', quantity: 1, sales_date: '2021-02-02', attachment: null },
        { id: 26, user_id: 3, package_name: 'Red', quantity: 1, sales_date: '2021-03-04', attachment: null },
        { id: 27, user_id: 1, package_name: 'Yellow', quantity: 1, sales_date: '2021-02-23', attachment: null },
        { id: 28, user_id: 1, package_name: 'Red', quantity: 1, sales_date: '2021-01-11', attachment: null },
        { id: 29, user_id: 1, package_name: 'Blue', quantity: 1, sales_date: '2021-03-30', attachment: null },
        { id: 30, user_id: 3, package_name: 'Red', quantity: 1, sales_date: '2021-01-04', attachment: null },
      ]);
    });
};
