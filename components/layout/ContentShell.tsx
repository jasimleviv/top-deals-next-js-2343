import Link from "next/link";

type ContentShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ContentShell({ eyebrow, title, description, children }: ContentShellProps) {
  return (
    <main className="content-page">
      <div className="content-shell">
        <Link href="/" className="content-back">
          Top Deals
        </Link>
        {eyebrow ? <div className="content-eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        <p className="content-lead">{description}</p>
        {children}
      </div>
    </main>
  );
}
