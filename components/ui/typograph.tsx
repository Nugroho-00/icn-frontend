export function TypographyH1({children}: { children?: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: { children?: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children ?? "The Kingdom of Next.js"}
    </h2>
  );
}

export function TypographyH3({ children }: { children?: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children ?? "The Kingdom of Next.js"}
    </h3>
  );
}

export function TypographyH4({ children }: { children?: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children ?? "People stopped telling jokes"}
    </h4>
  );
}

export function TypographyP({ children }: { children?: React.ReactNode }) {
  return (
    <p className="leading-7">
      {children ?? "The Kingdom of Next.js"}
    </p>
  );
}

export function TypographyBlockquote({ children }: { children?: React.ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
       {children ?? "The Kingdom of Next.js"}
    </blockquote>
  )
}

