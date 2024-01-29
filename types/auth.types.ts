export type LoginType = {
    email: string;
    password: string;
};

export type SignupType = LoginType & {
    firstName: string;
    lastName: string;
};

export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    lastLoginDate: string;
};
