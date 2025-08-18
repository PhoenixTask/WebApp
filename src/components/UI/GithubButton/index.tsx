"use client";

import { useEffect, useState } from "react";
import { Flex, Icon, Link, Button } from "..";

type GithubStarButtonProps = {
  username: string;
  repo: string;
  children?: React.ReactNode;
};

export default function GithubStarButton({
  username,
  repo,
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
    <Link asChild to={repoUrl} target="_blank">
      <Button variant="base">
        <Flex alignItems="center" justifyContent="center">
          <div className="flex">
            <span className="mt-0.5">{stars !== null ? stars : "..."}</span>
            <Icon iconName="Star" className="text-warning" />
          </div>
          <span className="mt-0.5">{repo}</span>
          <Icon iconName="Github" />
        </Flex>
      </Button>
    </Link>
  );
}
