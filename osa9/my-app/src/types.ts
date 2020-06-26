/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, ReactElement, WeakValidationMap, ValidationMap } from "react";

export type FC<P = {}> = FunctionComponent<P>;

export interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}