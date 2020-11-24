import 'reflect-metadata';
import { ClassType } from 'class-transformer/ClassTransformer';
import { plainToClass } from 'class-transformer';
import { validateOrReject, validateSync } from 'class-validator';

export function load<T extends ClassType<any>>(Cls: T) {
    const instance = plainToClass(Cls, process.env, { excludeExtraneousValues: true });

    const validationResult = validateSync(instance, { forbidUnknownValues: true });

    if (validationResult.length > 0) {
        throw validationResult;
    }

    return instance;
}

export async function loadAsync<T extends ClassType<any>>(Cls: T): Promise<InstanceType<T>> {
    const instance = plainToClass(Cls, process.env, { excludeExtraneousValues: true });

    await validateOrReject(instance);

    return instance;
}