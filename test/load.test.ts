import { IsNotEmpty, IsNumber, IsString, } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { load } from '../src';

test('Should create an instance of the config class with the user property read from the env.', () => {
    class Config {
        @IsString()
        @Expose({ name: 'USER' })
        public user: string;
    }

    const config = load(Config);
    expect(config.user).toBe(process.env.USER);
});

test('Should not create an instance of the config class if there are missing fields in the env.', () => {
    class Config {
        @IsString()
        @IsNotEmpty()
        @Expose({ name: 'gibberish' })
        public gibberish: string;
    }

    expect(() => {
        load(Config);
    }).toThrow();
});

test('Should transform number value properly.', () => {
    const expectedValue = 123;
    process.env.int = expectedValue.toString();

    class Config {
        @Expose({ name: 'int' })
        @IsNumber()
        @Type(() => Number)
        public int: string;
    }

    const config = load(Config);
    expect(config.int).toBe(expectedValue);
})
