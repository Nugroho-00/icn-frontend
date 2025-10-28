import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeDisabled(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveValue(value: string | string[] | number): R;
    }
  }
}
