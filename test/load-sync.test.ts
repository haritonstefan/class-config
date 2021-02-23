import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { loadSync } from '../src';

test('Should create an instance of the config class with the user property read from the env.', () => {
    // Define the class for the test
    class Config {
        @IsString()
        @Expose({ name: 'USER' }) // The value should be read from 'USER' property of the environment and exposed as 'user' on the Config class;
        public user: string;
    }

    // Load the environment values into the above class;
    const config = loadSync(Config);
    // Confirm that the real is equal to the expected
    expect(config.user).toBe(process.env.USER);
});

test('Should not create an instance of the config class if there are missing fields in the env.', () => {
    class Config {
        @IsString()
        @IsNotEmpty()
        public gibberish: string; // Will attempt to read process.env.gibberish, which should not exist
    }

    expect(() => {
        loadSync(Config);
    }).toThrow();
});

test('Should transform number value properly.', () => {
    const expectedValue = 123;
    process.env.int = expectedValue.toString(); // Environment values usually are strings

    class Config {
        @IsNumber() // The value should be a numerical string
        @Type(() => Number) // The value should be converted to  number
        @Expose({ name: 'int' })
        public int: string;
    }

    const config = loadSync(Config);
    expect(config.int).toBe(expectedValue);
});
