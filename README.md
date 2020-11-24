# class-config
A module to read and validate the environment in which it's invoked.
It uses [class-validator](https://github.com/typestack/class-validator) and
[class-transformer](https://github.com/typestack/class-validator)

## Example
```typescript
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { load } from 'class-config';

// assuming there is a USER env value with the value of ADMIN

class Config {
        @IsString()
        @Expose({ name: 'USER' })
        public user: string;
    }

const config = load(Config);
config instanceof Config //true
config.user // ADMIN
```

You can use any decorators from [class-validator](https://github.com/typestack/class-validator) and
[class-transformer](https://github.com/typestack/class-validator) to enhance your config class.