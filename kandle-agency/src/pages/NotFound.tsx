import { ButtonLink } from "../components/Button";

export default function NotFound() {
  return (
    <div className="bg-ink text-paper min-h-[70vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="font-serif text-7xl text-kandle-green">404</div>
        <h1 className="font-serif text-3xl mt-4">This page didn't grow in.</h1>
        <p className="mt-4 text-paper/60">The page you're looking for doesn't exist.</p>
        <ButtonLink to="/" variant="stroke-light" className="mt-8 inline-flex">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
