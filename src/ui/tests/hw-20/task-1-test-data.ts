//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

export const negativeTestCases = [
    {
        testCaseName: 'Empty username',
        username: '',
        password: 'ValPass1',
        errorMessage: 'Username is required'
    },
    {
        testCaseName: 'Username too short',
        username: 'Ab',
        password: 'ValPass1',
        errorMessage: 'Username should contain at least 3 characters'
    },
    {
        testCaseName: 'Username with only spaces',
        username: '   ',
        password: 'ValPass1',
        errorMessage: 'Prefix and postfix spaces are not allowed is username'
    },
    {
        testCaseName: 'Username with leading/trailing spaces',
        username: ' a ',
        password: 'ValPass1',
        errorMessage: 'Prefix and postfix spaces are not allowed is username'
    },
    {
        testCaseName: 'Empty password',
        username: 'Ab 1',
        password: '',
        errorMessage: 'Password is required'
    },
    {
        testCaseName: 'Password too short',
        username: 'Ab 2',
        password: 'ValPass',
        errorMessage: 'Password should contain at least 8 characters'
    },
    {
        testCaseName: 'Password without uppercase',
        username: 'Ab 3',
        password: 'alllower',
        errorMessage: 'Password should contain at least one character in upper case'
    },
    {
        testCaseName: 'Password without lowercase',
        username: 'Ab 4',
        password: 'ALLUPPER',
        errorMessage: 'Password should contain at least one character in lower case'
    },
    {
        testCaseName: 'Password with only spaces',
        username: 'Ab 5',
        password: '        ',
        errorMessage: 'Password is required'
    },
];