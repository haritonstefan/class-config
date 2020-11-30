# class-config
A module to read and validate the environment in which it's invoked.
It uses [class-validator](https://github.com/typestack/class-validator) and
[class-transformer](https://github.com/typestack/class-validator)

## Example
```typescript
import { IsFQDN, IsIP, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { loadSync } from './dist';

// assuming there are the following values in process.env
process.env.USER = 'ADMIN';
process.env.APP_PORT = '1234';
process.env.APP_HOST = '0.0.0.0';
process.env.APP_FQDN = 'host.domain.com'

class Config {
    @IsString() //  Checks the value is a string
    @IsNotEmpty() // Not empty
    @Expose({ name: 'USER' }) // Reading it from process.env.USER property
    public user: string;

    @IsNumber() // Checks that the value is a number, or a string represented number
    @Type(() => Number)
    @Expose({ name: 'APP_PORT' }) // Reading it from process.env.APP_PORT property
    public appPort: number;

    @IsIP() // Checks that the value is an IP
    @Expose({ name: 'APP_HOST' }) // Reading it from process.env.APP_HOST
    public appHost: string;

    @IsFQDN()
    @Expose({ name: 'APP_FQDN' })
    public appFQDN: string = 'host.domain.com'; // Setting a default value
}

const config = loadSync(Config); // there is also load, which is the asynchronous version of loadSync.
console.log(config instanceof Config) //true
console.log(config.user) // 'ADMIN'
console.log(config.appPort) // 1234
console.log(config.appHost) // '0.0.0.0'
console.log(config.appFQDN) // 'localhost'
```

You can use any decorators from [class-validator](https://github.com/typestack/class-validator) and
[class-transformer](https://github.com/typestack/class-validator) to enhance your config class.