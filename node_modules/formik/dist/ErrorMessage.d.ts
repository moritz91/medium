import * as React from 'react';
import { FormikContext } from './types';
export interface ErrorMessageProps {
    name: string;
    className?: string;
    component?: string | React.ComponentType;
    children?: ((errorMessage: string) => React.ReactNode);
    render?: ((errorMessage: string) => React.ReactNode);
}
export declare const ErrorMessage: React.ComponentClass<ErrorMessageProps, any> & {
    WrappedComponent: React.ComponentClass<ErrorMessageProps & {
        formik: FormikContext<ErrorMessageProps & {
            formik: FormikContext<any>;
        }>;
    }, any>;
};
