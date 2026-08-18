export default function Footer() {
  return (
    <footer className="flex h-16 items-center justify-center border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
      © {new Date().getFullYear()} Supalango. All rights reserved.
    </footer>
  );
}
