import { User } from '../index';

export const initializeDatabase = async () => {
    try {
        const users = await User.findAll();

        if (users.length === 0) {
            await User.create({ balance: 10000 });
            console.log('✅ Default user created with balance 10000');
        } else {
            console.log('💡 User already exists.');
        }

        const user = users[0];  
        if (user.balance < 10000) {
            await user.update({ balance: 10000 });
            console.log('✅ User balance updated to 10000');
        }else {
            console.log('✅ User balance is already 10000');
        }
    } catch (error) {
        console.error('❌🔥 Error initializing the database:', error);
    }
};
