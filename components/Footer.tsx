export default function Footer() {
  return (
    <footer className="bg-zinc-900 py-6 lg:py-12">
      <div>
        <p className="text-center text-xs leading-5 text-zinc-400 block">
          The source code for this website is hosted on{" "}
          <a
            className="text-orange-200 hover:text-zinc-100"
            href="https://github.com/pawelgrzybek/nn1.dev"
          >
            GitHub
          </a>
          .{" "}
        </p>
      </div>
    </footer>
  );
}
