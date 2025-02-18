import dotenv from 'dotenv';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from '../interfaces/user-attributes.interface';
import { initializeDatabase } from './seed/index';


dotenv.config();

if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_HOST || !process.env.POSTGRES_PORT || !process.env.POSTGRES_DB) {
    console.error('❌🔥 Missing required environment variables.');
    process.exit(1); 
}

const POSTGRES_URI = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const sequelize = new Sequelize(POSTGRES_URI, {
    dialect: 'postgres',
    logging: false,
    pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
});

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public balance!: number;
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10000 },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
    }
);

export { sequelize, User };

const initializeDatabaseAndSeed = async () => {
    try {
        await sequelize.sync(); 
        console.log('✅ Database synchronized successfully.');

        await initializeDatabase(); 
    } catch (error) {
        console.error('❌🔥 Error initializing the database and seeding:', error);
        process.exit(1);
    }
};

initializeDatabaseAndSeed();
