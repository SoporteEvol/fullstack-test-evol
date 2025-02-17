import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApplyToClass,
  type DecoratorsLookUp,
  type DecoratorsLookUpFn,
  getDecorators,
} from './apply.decorator';

/**
 * Decorator factory for apply Swagger
 * docs to Controller and its methods.
 *
 * @param decorators - lookup with an array of decorators
 *
 * @returns class decorator if swagger is enabled
 */
export function ApplyControllerDocs(
  decorators: DecoratorsLookUp | DecoratorsLookUpFn,
): ClassDecorator {
  return process.env.SWAGGER_UI === 'true'
    ? ApplyToClass(getDecorators(decorators))
    : () => void 0;
}

export const commonResponses = [
  ApiResponse({
    description: 'Internal error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  }),
];
