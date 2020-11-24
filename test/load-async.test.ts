import { IsNotEmpty, IsNumber, IsString, } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { loadAsync } from '../src';

test('Should create an instance of the config class with the user property read from the env.', async () => {
    class Config {
        @IsString()
        @Expose({ name: 'USER' })
        public user: string;
    }

    const config = await loadAsync(Config);
    expect(config.user).toBe(process.env.USER);
});

test('Should not create an instance of the config class if there are missing fields in the env.', async () => {
    class Config {
        @IsString()
        @IsNotEmpty()
        @Expose({ name: 'gibberish' })
        public gibberish: string;
    }

    await expect(loadAsync(Config)).rejects.toEqual([{ "children": [],
            "constraints": {
                "isNotEmpty": "gibberish should not be empty",
                "isString": "gibberish must be a string"
            },
            "property": "gibberish",
            "target": { "gibberish": undefined },
            "value": undefined
        }]
    )
});

test('Should transform number value properly.', async () => {
    const expectedValue = 123;
    process.env.int = expectedValue.toString();

    class Config {
        @Expose({ name: 'int' })
        @IsNumber()
        @Type(() => Number)
        public int: string;
    }

    const config = await loadAsync(Config);
    expect(config.int).toBe(expectedValue);
})