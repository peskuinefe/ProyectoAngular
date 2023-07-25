import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('appblockchain','root','vegetta123',{
    host:'localhost',
    dialect:'mysql'
});

export default sequelize