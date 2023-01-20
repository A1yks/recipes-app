export type AuthProps = {
    type: 'register' | 'login';
};

export type FormState = {
    login: string;
    password: string;
    name: string;
    surname: string;
};
