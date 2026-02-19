import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-1 px-6 py-6 text-sm text-muted">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://github.com/seyun-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            seyun
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
