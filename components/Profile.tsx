import Image from "next/image";

export interface ProfileProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
  urlWebsite?: string;
  urlGitHub?: string;
  urlLinkedIn?: string;
  urlMastodon?: string;
  urlTwitter?: string;
}

const Profile = ({
  name,
  role,
  image,
  bio,
  urlWebsite,
  urlGitHub,
  urlLinkedIn,
  urlMastodon,
  urlTwitter,
}: ProfileProps) => {
  return (
    <div className="flex flex-row gap-4 md:gap-8">
      <div className="shrink-0">
        <Image
          src={image}
          alt={name}
          width="96"
          height="96"
          className="w-12 aspect-square rounded-md object-cover md:w-24"
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold leading-8 tracking-tight">
          {name}
        </h3>
        <p className="text-zinc-400">{role}</p>
        <p className="mt-6 text-base leading-7 mb-8">{bio}</p>
        <ul className="text-sm leading-6">
          {urlWebsite && (
            <li className="truncate mb-1">
              <span className="text-zinc-400 hidden md:inline">Website: </span>
              <a
                className="text-orange-200 hover:text-zinc-100 truncate"
                href={urlWebsite}
              >
                {urlWebsite}
              </a>
            </li>
          )}
          {urlGitHub && (
            <li className="truncate mb-1">
              <span className="text-zinc-400 hidden md:inline">GitHub: </span>
              <a
                className="text-orange-200 hover:text-zinc-100 truncate"
                href={urlGitHub}
              >
                {urlGitHub}
              </a>
            </li>
          )}
          {urlLinkedIn && (
            <li className="truncate mb-1">
              <span className="text-zinc-400 hidden md:inline">LinkedIn: </span>
              <a
                className="text-orange-200 hover:text-zinc-100 truncate"
                href={urlLinkedIn}
              >
                {urlLinkedIn}
              </a>
            </li>
          )}
          {urlMastodon && (
            <li className="truncate mb-1">
              <span className="text-zinc-400 hidden md:inline">Mastodon: </span>
              <a
                className="text-orange-200 hover:text-zinc-100 truncate"
                href={urlMastodon}
              >
                {urlMastodon}
              </a>
            </li>
          )}
          {urlTwitter && (
            <li className="truncate mb-1">
              <span className="text-zinc-400 hidden md:inline">Twitter: </span>
              <a
                className="text-orange-200 hover:text-zinc-100 truncate"
                href={urlTwitter}
              >
                {urlTwitter}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
