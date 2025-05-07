import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

export default function customErrors() {
  const buildObjWithValue = (paths: string[], value = '') => {
    return paths.reduceRight(
      (acc, item, index) => ({
        message: index === paths.length - 1 ? value : acc,
        success: false,
      }),
      {},
    );
  };

  const isObject = (item: any) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  };

  const mergeDeep = (target: any, source: any) => {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };

  return (error: any, req: Request, res: Response, next: NextFunction) => {
    if (!isCelebrateError(error)) {
      return next(error);
    }
    let data = {};
    // eslint-disable-next-line no-unused-vars
    for (const [segment, joiError] of error.details.entries()) {
      joiError.details.forEach(err => {
        const obj = buildObjWithValue(
          err.path.map(item => item.toString()),
          err.message.replace('"', '').replace('"', ''),
        );
        data = mergeDeep(data, obj);
      });
    }
    return res.status(400).json(data);
  };
}
