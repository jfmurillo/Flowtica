import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn--primary">
        Back to home
      </Link>
    </div>
  );
}
