"use client";

import { useEffect, useState } from "react";
import { Link } from "..";

type GithubStarButtonProps = {
  username: string;
  repo: string;
  children?: React.ReactNode;
};

export default function GithubStarButton({
  username,
  repo,
  children,
}: GithubStarButtonProps) {
  const [stars, setStars] = useState<number | null>(null);
  const repoUrl = `https://github.com/${username}/${repo}`;

  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${repo}`)
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((err) => console.error("GitHub API error:", err));
  }, [username, repo]);

  return (
    <Link
      to={repoUrl}
      target="_blank"
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      {children} {stars !== null ? stars : "..."}
    </Link>
  );
}
