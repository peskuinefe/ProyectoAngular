import express , {Application} from 'express';
import cors from 'cors'
import routesUser from '../routes/user';
import { User } from './user';
import db from '../db/connection'

class Server {

    private app : Application;
    private port: string ;

    constructor(){
        this.app= express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();  
        this.dbConnect();  
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server on port ${this.port}`);
        })
    }

    routes(){
        this.app.use('/api/users',routesUser);
    }
    midlewares(){
        this.app.use(express.json());

        //cors
        this.app.use(cors())
    }

    async dbConnect(){
        try{
            await User.sync()
        }catch(error){
            console.error('Unable to connect to the database',error);
            
        }
    }

}

export default Server