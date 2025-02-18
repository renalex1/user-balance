import { Optional } from 'sequelize';

export interface UserAttributes {
    id: number;
    balance: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
