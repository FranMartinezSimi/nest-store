import { Module, Global } from '@nestjs/common';

const Api_key = '1234567';
const api_key_prod = 'prod123456';

@Global()
@Module({
    providers: [
        {
            provide: 'Api_key',
            useValue: process.env.NODE_ENV === 'prod' ? api_key_prod : Api_key,
        },
    ],
    exports: ['Api_key'],
})
export class DatabaseModule { }
